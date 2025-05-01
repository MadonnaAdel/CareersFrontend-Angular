export interface IAppliedJob {
  _id?: string; 
  jobId: string;
  userId: string;
  appliedJobStatus: 'accepted' | 'rejected' | 'pending';
  additionalFormSubmitted: boolean;
  FirstAnswer?: string;
  SecondAnswer?: string;
  thirdAnswer?: string;
  FourthAnswer?: string;
  timeStamp?: Date;
}
