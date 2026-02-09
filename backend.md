#    pip install --pre azure-ai-projects>=2.0.0b1
#    pip install azure-identity

import azure.functions as func
import logging
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
import json
import os

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


def extract_text_from_response(resp):
    text = getattr(resp, "output_text", None)
    if isinstance(text, str) and text.strip():
        return text

    parts = []
    try:
        for item in getattr(resp, "output", []) or []:
            for content in getattr(item, "content", []) or []:
                ctype = getattr(content, "type", None)
                if ctype in ("output_text", "text"):
                    t = getattr(content, "text", None)
                    if t:
                        parts.append(t)
    except Exception:
        logging.exception("Failed to parse response output")
    return "".join(parts).strip()


@app.route(route="call-agent")
def call_agent(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    try:
        req_body = req.get_json()
        user_message = req_body.get('message', 'Tell me what you can help with.')
        
        # Uses managed identity on Azure, DefaultAzureCredential locally
        project_client = AIProjectClient(
            endpoint=os.getenv("AZURE_EXISTING_AIPROJECT_ENDPOINT"),
            credential=DefaultAzureCredential(
                exclude_managed_identity_credential=True, # flip later when deploying to Azure
                exclude_cli_credential=True,
                # Keep VS Code enabled:
                exclude_visual_studio_code_credential=False,
                # If you have multiple tenants, force the right one:
                visual_studio_code_tenant_id= os.getenv("PROJECT_TENANT_ID")

            ),
        )
        
        # Get the existing agent
        myAgent = os.getenv("AZURE_EXISTING_AGENT_ID")

        agent = project_client.agents.get(agent_name=myAgent)

        openai_client = project_client.get_openai_client()

        # Reference the agent to get a response
        response = openai_client.responses.create(
            input=[{"role": "user", "content": user_message}],
            extra_body={"agent": {"name": agent.name, "type": "agent_reference"}},
        )

        text = extract_text_from_response(response) or "(no text returned)"

        return func.HttpResponse(
            json.dumps({"response": text}),
            status_code=200,
            mimetype="application/json",
        )

    except Exception as e:
        logging.exception("Unhandled error")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=500,
            mimetype="application/json",
        )
