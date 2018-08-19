export interface IUsersGroupJbh {
    id?: number;
    name?: string;
    invitationAccepted?: boolean;
    idUserOwnerId?: number;
    idUserInvitedId?: number;
}

export class UsersGroupJbh implements IUsersGroupJbh {
    constructor(
        public id?: number,
        public name?: string,
        public invitationAccepted?: boolean,
        public idUserOwnerId?: number,
        public idUserInvitedId?: number
    ) {
        this.invitationAccepted = this.invitationAccepted || false;
    }
}
