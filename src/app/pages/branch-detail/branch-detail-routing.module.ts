import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchDetailPage } from './branch-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BranchDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchDetailPageRoutingModule {}
