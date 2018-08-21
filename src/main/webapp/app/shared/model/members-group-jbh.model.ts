import { IUsersGroupJbh } from 'app/shared/model//users-group-jbh.model';

export interface IMembersGroupJbh {
    id?: number;
    invitationAccepted?: boolean;
    idUserInvitedId?: number;
    members?: IUsersGroupJbh[];
}

export class MembersGroupJbh implements IMembersGroupJbh {
    constructor(
        public id?: number,
        public invitationAccepted?: boolean,
        public idUserInvitedId?: number,
        public members?: IUsersGroupJbh[]
    ) {
        this.invitationAccepted = false;
    }
}
