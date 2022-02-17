import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {
  public branches: Array<any>;
  public branches_inlocation: Array<any> = [];
  constructor(public map: MapService) { 
    this.branches = [
      {
        nama: 'Shah Alam',
        latitude: 3.07373,
        longitude: 101.54309
      },
      {
        nama: 'Kuala Selangor',
        latitude: 3.3305255,
        longitude: 101.2525575
      },
      {
        nama: 'Selayang',
        latitude: 3.2571357,
        longitude: 101.6552533
      }
    ];

  }

  ngOnInit() {
    // this.map.getCurrentCoords();
    this.getDistances();
  }

  async getDistances(){
    try {
      /**
       * 1. Get distance from current location with each of branches
       * 2. Compare the distance with set distance i.e 50km
       * 3. Push the branch in new data array and display at view
       * 4. Navigate to next page along with lat and long
       */
      let result: any = await this.map.getDistanceMatrix(this.branches);
      //begin add each distance
      let branch_distances: any = result.rows[0].elements;
      // console.log('branch distances ==> ', branch_distances);
      for (let index in this.branches){
        let branch_distance = branch_distances[index].distance.value;
        if( branch_distance < 50000) {
          let branch = this.branches[index];
          branch["distance"] = branch_distance;
          this.branches_inlocation.push(branch);
        }
      }

      console.log('branches within your area ==> ', this.branches_inlocation);

    } catch (error) {
      console.log(error)
    }
        // let distance: any = branch.distance.value;
        // if(distance > 50000){
        //   this.branches_inlocation.push()
        // }
  }

  convertDistance(distance: number){
    return (distance / 1000).toFixed(2);
  }

}
