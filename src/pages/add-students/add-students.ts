import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  AlertController,
  IonicPage,
  FabContainer,
  NavController,
  NavParams,
} from 'ionic-angular';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';

import {
  RoomsProvider,
} from '../../providers/providers';

import *  as Papa from 'papaparse';

interface Student {
  name: String,
  id: String,
  _imported?: Boolean,
};

@IonicPage({
  segment: 'students'
})
@Component({
  selector: 'page-add-students',
  templateUrl: 'add-students.html',
})
export class AddStudentsPage {
  @ViewChild('file') file: ElementRef;
  @ViewChild('fab') fab: FabContainer;

  form: FormGroup;

  room = this.navParams.get('room');
  data: any;

  import: boolean = false;
  saved: boolean = true;

  constructor(
    public fb: FormBuilder,
    public rs: RoomsProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      students: this.fb.array([])
    });
  }

  initStudent(student?: Student) {
    return this.fb.group({
      name: [student && student.name || '', Validators.required],
      id: [student && student.id || '', Validators.required],
      _imported: [student && student._imported],
    });
  }

  ionViewDidLoad() {
    // open fab options
    this.fab.toggleList();

    // load students from room
    this.load(this.room.students);
  }

  load(students, isFromFile?: Boolean) {
    const control = <FormArray>this.form.controls['students'];

    if (isFromFile) {
      students.forEach((student) => {
        student._imported = true;
        control.push(this.initStudent(student));
      });
    } else {
      students.forEach((student) => {
        control.push(this.initStudent(student));
      });
    }
  }

  open() {
    this.file.nativeElement.click();
  }

  add() {
    const control = <FormArray>this.form.controls['students'];
    control.push(this.initStudent());
  }

  remove(index) {
    const control = <FormArray>this.form.controls['students'];
    control.removeAt(index);

    // to enable save button
    this.form.markAsDirty();
  }

  save() {
    // sort by name
    this.form.value.students.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);

    this.rs.setStudents(this.room, this.form.value.students)
      .then((res) => {
        // disable undo button
        this.import = false;
    });
  }

  undo() {
    const control = <FormArray>this.form.controls['students'];
    const imported = control.value.filter(x => !x._imported);

    // reset form
    this.initForm();

    // load
    this.load(imported);

    // disable undo button
    this.import = false;
  }

  uploadChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        this.data = results;
        this.load(results.data, true);

        this.import = true;

        // to enable save button
        this.form.markAsDirty();

        // clear value, so that will trigger w/ same path
        event.target.value = null;
      }
    });
  }
}
