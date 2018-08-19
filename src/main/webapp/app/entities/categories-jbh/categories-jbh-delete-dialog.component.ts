import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoriesJbh } from 'app/shared/model/categories-jbh.model';
import { CategoriesJbhService } from './categories-jbh.service';

@Component({
    selector: 'jhi-categories-jbh-delete-dialog',
    templateUrl: './categories-jbh-delete-dialog.component.html'
})
export class CategoriesJbhDeleteDialogComponent {
    categories: ICategoriesJbh;

    constructor(
        private categoriesService: CategoriesJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoriesListModification',
                content: 'Deleted an categories'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categories-jbh-delete-popup',
    template: ''
})
export class CategoriesJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categories }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoriesJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.categories = categories;
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
