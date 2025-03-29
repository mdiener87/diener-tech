export interface TimelineItem {
  id: number;
  content: string;
  title?: string;
  start: Date | string;
  end?: Date | string;
  type: 'range' | 'point' | 'background' | 'box';
  className?: string;
  group?: string | number;
  details: {
    type?: string;
    position?: string;
    title?: string;
    description?: string;
    achievements?: string[];
    technologies?: string[];
    projectName?: string;
    client?: string;
    impact?: string;
  };
}

export interface GroupItem {
  id: string | number;
  content: string;
  className?: string;
  order?: number;
  subgroupOrder?: any;
  visible?: boolean;
  nestedGroups?: Array<string | number>;
  showNested?: boolean;
}
