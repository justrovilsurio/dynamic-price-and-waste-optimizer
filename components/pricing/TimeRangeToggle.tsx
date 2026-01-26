'use client';

import { SegmentedControl } from '../ui/SegmentedControl';
import { TimeRange } from '../../lib/types';

interface TimeRangeToggleProps {
  timeRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function TimeRangeToggle({ timeRange, onChange }: TimeRangeToggleProps) {
  return (
    <SegmentedControl
      options={[
        { label: '12 Months', value: '12m' },
        { label: '30 Days', value: '30d' },
      ]}
      value={timeRange}
      onChange={(value) => onChange(value as TimeRange)}
    />
  );
}
