import { DiscussionMessageTypeEnum } from './discussion-message-type-enum';
import { UserModel } from '../../../core/model/user-model';

export interface DiscussionMessageModel {
  id?: number;
  name?: string;
  message?: string;
  created?: Date;
  typ?: DiscussionMessageTypeEnum;
  createdBy?: UserModel;
}
