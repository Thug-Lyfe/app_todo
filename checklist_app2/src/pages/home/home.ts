import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
 todos:[{name:"Piller",type:"check",time_reset:1,time_left:1,done:false},
        {name:"Ryd op",type:"check",time_reset:7,time_left:5,done:true},
        {name:"Birthday",type:"date",date:"2018-02-08",done:false},
        {name:"Push ups",type:"counter",start:0,asc:false,time_reset:1,time_left:1,done:false},
        {name:"Eating",type:"timer",time_stopped:"08:00",time_reset:1,time_left:1,done:false}
      ]

 days:[{id:"2018-02-07",todos:[]},
       {id:"2018-02-06",todos:[]}]

 today:{id:"2018-02-08",todos:[]} 
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  todos: Object[] = [];
  todo: string;
  constructor(public navCtrl: NavController, private storage: Storage) {
    /*this.storage.clear().then(() => {
      console.log("cleared")
    });*/
    /*this.storage.set("todos",[]);
    this.storage.get("todos").then((list)=>{
      list.push({name:"Piller",type:"check",time_reset:1,time_left:1,done:false});
      list.push({name:"Ryd op",type:"check",time_reset:7,time_left:5,done:true});
      list.push({name:"Birthday",type:"date",date:"2018-02-08",done:false});
      list.push({name:"Push ups",type:"counter",start:0,asc:false,time_reset:1,time_left:1,done:false});
      list.push({name:"Eating",type:"timer",time_stopped:"08:00",time_reset:1,time_left:1,done:false});
      this.storage.set("todos",list);
    })*/
    this.storage.ready().then((resolve) => {
      this.storage.get("today").then((today)=>{
        if(true){
         
          var cur = {id: new Date().toJSON().slice(0,10),todos:[]};
          this.storage.get("todos").then((list)=>{
            list.forEach(ele=>{
              if(ele.type == "date" && ele.date == cur.id){
                cur.todos.push(ele)
                console.log("today",ele)
              }
              if(ele.type != "date"){
                cur.todos.push(ele)
                console.log("not date",ele)
              }
            })
            console.log("cur: ",cur);
            this.storage.set("today",cur);
            this.storage.get("today").then((ele)=>{
              console.log(ele)
            })
          })
          
        }
        
      })
      /*this.storage.forEach((element, key) => {
        if (element != "" && element != null) {
          this.todos.push(element)
          console.log(key, element)
        }
      }).then(() => {
        console.log("ready")
      })*/
    })
  }

  add() {
    this.storage.ready().then(() => {
      if (this.todo == "") {
        this.storage.length().then((length) => {
          console.log("todo" + (length - 1))
          this.storage.get("todo" + (length - 1)).then((resolve) => {
            console.log(resolve)
          })
        })
      } else {
        this.storage.length().then((resolve) => {
          let obj = {key:"todo"+resolve,
            name:this.todo
          }
          this.storage.set("todo" + resolve, obj).then(() => {
            this.todos.push(obj);
            this.todo = "";
          });
        });
      }
    })
  }

  delete(item) {
    this.storage.ready().then(() => {
      var index = this.todos.indexOf(item, 0);
      if (index > -1) {
        this.storage.remove("todo" + index).then(() => {
          this.todos.splice(index, 1);

        });

      }
    })

  }
  log(item) {
    this.storage.ready().then(() => {
      //this.storage.
    });
  }
}