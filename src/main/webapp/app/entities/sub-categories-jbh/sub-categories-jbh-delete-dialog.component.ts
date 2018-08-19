import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';
import { SubCategoriesJbhService } from './sub-categories-jbh.service';

@Component({
    selector: 'jhi-sub-categories-jbh-delete-dialog',
    templateUrl: './sub-categories-jbh-delete-dialog.component.html'
})
export class SubCategoriesJbhDeleteDialogComponent {
    subCategories: ISubCategoriesJbh;

    constructor(
        private subCategoriesService: SubCategoriesJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subCategoriesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subCategoriesListModification',
                content: 'Deleted an subCategories'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-categories-jbh-delete-popup',
    template: ''
})
export class SubCategoriesJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subCategories }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubCategoriesJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subCategories = subCategories;
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
