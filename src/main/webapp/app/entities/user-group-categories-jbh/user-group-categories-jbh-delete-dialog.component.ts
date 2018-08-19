import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';
import { UserGroupCategoriesJbhService } from './user-group-categories-jbh.service';

@Component({
    selector: 'jhi-user-group-categories-jbh-delete-dialog',
    templateUrl: './user-group-categories-jbh-delete-dialog.component.html'
})
export class UserGroupCategoriesJbhDeleteDialogComponent {
    userGroupCategories: IUserGroupCategoriesJbh;

    constructor(
        private userGroupCategoriesService: UserGroupCategoriesJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userGroupCategoriesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userGroupCategoriesListModification',
                content: 'Deleted an userGroupCategories'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-group-categories-jbh-delete-popup',
    template: ''
})
export class UserGroupCategoriesJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userGroupCategories }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserGroupCategoriesJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userGroupCategories = userGroupCategories;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
