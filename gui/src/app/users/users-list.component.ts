import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { UserService } from './user.service';
import { IUser } from './user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  firstName: string;
  lastName: string;
  userName: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users: IUser[] = [];
  private pageTitle = 'Users List';

  constructor(private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchAllUsers();
  }

  private fetchAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let newUser = new IUser();
      newUser.firstName = result.firstnameControl;
      newUser.lastName = result.lastnameControl;
      newUser.userName = result.usernameControl;

      this.userService.addUser(newUser).subscribe(user => this.users.push(user),
      ()=>{}, () => {
        this.fetchAllUsers();
      });
    });
  }

  addUser() {
    console.log('user added');
  }

  editUser(user: IUser, uId: number) {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '400px',
      height: '400px',
      data: {firstName: user.firstName, lastName: user.lastName, userName: user.userName}, 
    });

    dialogRef.afterClosed().subscribe(result => {
      let newUser = new IUser();
      newUser.firstName = result.firstnameControl;
      newUser.lastName = result.lastnameControl;
      newUser.userName = result.usernameControl;

      this.userService.editUser(newUser, uId).subscribe(user => {
        let index = this.users.findIndex(i => i.id === uId);
        this.users[index] = newUser;
      },
      ()=>{}, () => {
        this.fetchAllUsers();
      });
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(
      () => {this.fetchAllUsers()}
    );
  }

}

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html',
})
export class AddUserDialog {

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.form = fb.group({
      firstnameControl: ["", Validators.required],
      lastnameControl: ["", Validators.required],
      usernameControl: ["", Validators.required]
    });

    if (data) {
      this.form.controls.firstnameControl.setValue(data.firstName);
      this.form.controls.lastnameControl.setValue(data.lastName);
      this.form.controls.usernameControl.setValue(data.userName);
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}