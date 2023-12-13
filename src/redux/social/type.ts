export declare type ISocialListItemType = 'text' | 'image' | 'video';
export interface ISocialListItem {
  id: string;
  type: ISocialListItemType;
  content?: string;
  image?: string;
  video?: string;
  viewCount?: number;
  likeCount?: number;
  onPlay?: () => void;
}
