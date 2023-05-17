import { AxiosError } from '@jovotech/framework';
export interface AlertInfo {
    spokenInfo: {
        content: SpokenInfoContent[];
    };
}
export interface PushNotification {
    status: string;
}
export interface Reminder {
    requestTime: string;
    alertInfo: AlertInfo;
    pushNotification: PushNotification;
}
export interface RecurrenceWithFreq {
    freq: string;
    byDay?: string[];
}
export interface Trigger {
    timeZoneId?: string;
}
export type ReminderStatus = 'ON' | 'COMPLETED' | string;
export interface AbsoluteReminderTrigger extends Trigger {
    type: 'SCHEDULED_ABSOLUTE';
    scheduledTime: string;
    recurrence?: RecurrenceWithFreq | RecurrenceWithRules;
}
export interface RelativeReminderTrigger extends Trigger {
    type: 'SCHEDULED_RELATIVE';
    offsetInSeconds: number;
}
export interface RecurrenceWithRules {
    startDateTime: string;
    endDateTime: string;
    recurrenceRules: string[];
}
export interface AbsoluteReminder extends Reminder {
    trigger: AbsoluteReminderTrigger;
}
export interface RelativeReminder extends Reminder {
    trigger: RelativeReminderTrigger;
}
export interface ReminderResponse {
    alertToken: string;
    createdTime: string;
    updatedTime: string;
    status: ReminderStatus;
    trigger?: AbsoluteReminderTrigger | RelativeReminderTrigger;
    alertInfo?: AlertInfo;
    pushNotification?: PushNotification;
    version: string;
    href: string;
}
export interface Alert {
    alertToken: string;
    createdTime: string;
    updatedTime: string;
    status: ReminderStatus;
    trigger: AbsoluteReminderTrigger | RelativeReminderTrigger;
    alertInfo: AlertInfo;
    pushNotification: PushNotification;
    version: string;
}
export interface ReminderListResponse {
    totalCount: number;
    alerts: Alert[];
    links?: string;
}
interface SpokenInfoContent {
    locale: string;
    text?: string;
    ssml?: string;
}
export declare function setReminder(reminder: AbsoluteReminder | RelativeReminder, apiEndpoint: string, permissionToken: string): Promise<ReminderResponse>;
export declare function updateReminder(alertToken: string, reminder: AbsoluteReminder | RelativeReminder, apiEndpoint: string, permissionToken: string): Promise<ReminderResponse>;
export declare function deleteReminder(alertToken: string, apiEndpoint: string, permissionToken: string): Promise<ReminderResponse>;
export declare function getAllReminders(apiEndpoint: string, permissionToken: string): Promise<ReminderListResponse>;
export declare function getReminder(alertToken: string, apiEndpoint: string, permissionToken: string): Promise<ReminderResponse>;
export declare function handleReminderApiErrors(error: AxiosError): Error | void;
export {};
