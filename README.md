#CanLoad.js 
#####Create simple, customizable AJAX loaders using the HTML5 canvas.

---

#####Quickly customize your loader with the [genorator](http://codyl19.github.io/CanLoad.js/)
----

###**Initializing CanLoad** 

  Download: [Development Copy](https://raw.githubusercontent.com/CodyL19/CanLoad.js/master/canload.js) - [Production Copy](https://raw.githubusercontent.com/CodyL19/CanLoad.js/master/canload.min.js)


```js
  <div id="ajax">
    <!--CanLoad spinner will be placed here-->
  </div>
  --
  canLoad("line", {id:'ajax'});
```
--

#####Requirements:

The function `canLoad()` expects two parameters to function correctly.

The first is a `"string"`, this specifies the loader _style_, and it defines what type of spinner will be loaded.

The `{object}` contains the all of the spinner options that we will get into next. The only required parameter for this part is the `id` which will specify where the spinner will be placed.

CanLoad does **not** require a Javascript library to work.
 
-
###**Customizing CanLoad**

```js
canLoad("chrome", {
  id: 'elm', 
  size:'40', 
  line:'3', 
  speed:sp, 
  color:"#44a0ee", 
  length:25,
  bg: {
    color:'#444',
    line:'',
    center:''
  }
});
```

In _CanLoad_ there are many options to customize the appearance of your spinner, as shown above.

-

**The following are the parameters found inside `{object}`**:

Type      | Name   | Description                                              | Example            | Required? 
:-------: | :----: | :------------------------------------------------------- | :----------------: | :-------: 
`String`  | id     | Element the spinner will be placed inside.               | `id:"myElm"`       | Yes       
`String`  | color  | Spinner line color.                                      | `color: "#333"`    | No        
`String`  | speed  | Spinner animation speed. `Slow`, `Medium`, or `Fast`.    | `speed: "medium"`  | No        
`Integer` | size   | Spinner size. Measured in `px`.                          | `size:40`          | No        
`Integer` | line   | Spinner line width. Measured in `px`.                    | `line:3`           | No        
`Integer` | length | Spinner line length. **Only useful for chrome style**.   | `length: 25`       | No        

**The following are the parameters found inside the `bg{object}` (Not required)**

Type      | Name   | Description                                              | Example            | Required? 
:-------: | :----: | :------------------------------------------------------- | :----------------: | :-------: 
`String`  | color  | Color of line behind spinner line.                       | `color:"#555"`     | No     
`String`  | center | Color of the area inside of spinner circle               | `center:"#777"`    | No
`Integer` | line   | Background line width. Measured in `px`                  | `line: 3`          | No          

