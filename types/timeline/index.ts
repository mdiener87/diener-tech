export interface TimelineItemDetails {
  position?: string;
  achievements?: string[];
  technologies?: string[];
  type?: string;
  title?: string;
  description?: string;
}

export interface TimelineItem {
  id: number;
  content: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  type: string;
  className: string;
  details: TimelineItemDetails;
}

export interface GroupItem {
  id: string;
  content: string;
  className?: string;
}
