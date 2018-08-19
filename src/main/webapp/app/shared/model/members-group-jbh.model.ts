export interface IMembersGroupJbh {
    id?: number;
    invitationAccepted?: boolean;
    idUserGroupId?: number;
    idUserOwnerId?: number;
    idUserInvitedId?: number;
}

export class MembersGroupJbh implements IMembersGroupJbh {
    constructor(
        public id?: number,
        public invitationAccepted?: boolean,
        public idUserGroupId?: number,
        public idUserOwnerId?: number,
        public idUserInvitedId?: number
    ) {
        this.invitationAccepted = false;
    }
}
