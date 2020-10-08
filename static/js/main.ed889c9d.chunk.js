(this["webpackJsonpreading-with-caffeine"]=this["webpackJsonpreading-with-caffeine"]||[]).push([[0],{22:function(e,t,a){e.exports=a(46)},27:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(16),l=a.n(r),i=(a(27),a(20)),s=a(6),c=a(17),m=a(18),d=a(21),u=a(19),p=a(5),f=a.n(p),h=a(2),g=a.n(h),S=(a(45),function(){return o.a.createElement("header",null,o.a.createElement("div",{className:"wrapper headerFlex"},o.a.createElement("h1",null,"Reading With",o.a.createElement("span",{className:"caffeine animate__animated animate__bounceIn"},"Caffeine"))))}),y=function(){return o.a.createElement("section",{className:"instructionsSection"},o.a.createElement("h2",null,"Instructions:"),o.a.createElement("p",null,"Planning a trip to pick up books from your local library? Use this tool to locate a coffee shop nearby where you can relax and read your books in peace. Follow the steps below for directions."),o.a.createElement("p",null,"1. Enter your library and set preferred distance."),o.a.createElement("p",null,"2. A map will appear with a list of 10 coffee shops around the library."),o.a.createElement("p",null,"3. Select your preferred coffee shop from the list and choose a mode of transportation to get directions."))},C=function(e){var t=e.handleLibraryInputChange,a=e.libraryInput,n=e.handleFormSubmit,r=e.handleRadiusSelected,l=e.showSuggestions,i=e.autoComplete,s=e.handleLibraryInputSelected,c=e.selectedRadius;return o.a.createElement(o.a.Fragment,null,o.a.createElement("form",{action:"submit"},o.a.createElement("div",{className:"formTopSection"},o.a.createElement("label",{htmlFor:"inputLocation"},"Find Library"),o.a.createElement("div",{className:"inputLocationContainer"},o.a.createElement("input",{type:"text",id:"inputLocation",className:"inputLocation",value:a,onChange:t,placeholder:"",autoComplete:"off"}),l&&o.a.createElement("ul",{className:"inputLocationAutoComplete"},i.map((function(e){return o.a.createElement("li",{key:e.id,className:"autoCompleteResults"},o.a.createElement("button",{type:"button",key:e.id,onClick:s,value:e.name},e.name))}))))),o.a.createElement("div",{className:"formBottomSection"},o.a.createElement("label",{htmlFor:"inputRadius"},"Maximum distance ",o.a.createElement("span",null,"(1 - 20km)")),o.a.createElement("input",{type:"number",id:"inputRadius",className:"inputRadius",min:"0",max:"20",value:c,onChange:r,placeholder:"",autoComplete:"off",required:!0}),o.a.createElement("button",{className:"formSubmitButton",type:"submit",onClick:n},"Go"))))},E=function(e){var t=e.selectedCoffeeShop,a=e.modeOfTransportation,n=e.handleTransportationChange,r=e.directionsToCoffeeShop;return o.a.createElement("div",{className:"transportationAndDirections"},""!==t&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"transportation"},o.a.createElement("div",{className:"directionMarkers"},o.a.createElement("div",{className:"directionMarkerContainer"},o.a.createElement("img",{src:"https://assets.mapquestapi.com/icon/v2/marker-start.png"}),o.a.createElement("p",null,"Start")),o.a.createElement("div",{className:"directionMarkerContainer"},o.a.createElement("img",{src:"https://assets.mapquestapi.com/icon/v2/marker-end.png"}),o.a.createElement("p",null,"End"))),o.a.createElement("div",{className:"modeOfTransportationInputContainer"},o.a.createElement("label",{htmlFor:"modeOfTransportation"},"Choose a mode of transportation:"),o.a.createElement("select",{id:"modeOfTransportation",value:a,onChange:n},o.a.createElement("option",{value:"fastest"},"Drive"),o.a.createElement("option",{value:"pedestrian"},"Walk"),o.a.createElement("option",{value:"bicycle"},"Bike")))),o.a.createElement("ol",{className:"directionsToCoffeeShopOl"},r.map((function(e,t){return o.a.createElement("li",{key:t},e)})))))},v=function(e){var t=e.coffeeShops,a=e.handleCoffeeShopSelected,n=e.coffeeShopClicked,r=e.selectedCoffeeShop,l=e.modeOfTransportation,i=e.handleTransportationChange,s=e.directionsToCoffeeShop,c=e.handleBackButton;e.selectedLibrary;return o.a.createElement("div",{className:"coffeeShops"},n?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"transportation"},o.a.createElement("button",{className:"transportationButton",onClick:c},"\u2b05 to Coffee Shops")),o.a.createElement("h2",null,"Directions"),o.a.createElement(E,{selectedCoffeeShop:r,modeOfTransportation:l,handleTransportationChange:i,directionsToCoffeeShop:s})):o.a.createElement(o.a.Fragment,null,o.a.createElement("h2",null,"Coffee Shops In The Area"),o.a.createElement("ol",{className:"coffeeShopsContainer"},t.map((function(e,t){return o.a.createElement("li",{key:e.id},o.a.createElement("button",{className:"coffeeShopButton",type:"button",key:e.id,onClick:a,value:e.id},o.a.createElement("div",{className:"coffeeShopNumber"},o.a.createElement("p",null,t+1)),o.a.createElement("div",{className:"coffeeShopText"},o.a.createElement("h3",null,e.name),o.a.createElement("p",null,e.place.properties.street))))})))))},b=function(){return o.a.createElement("footer",null,o.a.createElement("div",{className:"wrapper footerFlex"},o.a.createElement("div",{className:"creators"},o.a.createElement("p",null,"Created by Andre Facey + Connie Tsang + Kristen Delorey + Raphael Roques at ",o.a.createElement("a",{href:"https://junocollege.com/"},"Juno College"))),o.a.createElement("div",{className:"photoCredit"},o.a.createElement("p",null,"Image by Thomas Park / Unsplash"))))},w=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).handleLibraryInputChange=function(t){e.state.showSuggestions||e.setState({showSuggestions:!0});var a=t.target.value;e.setState({libraryInput:a},(function(){if(a.length>=3&&a.length<25){f()({url:"https://www.mapquestapi.com/search/v3/prediction",params:{q:e.state.libraryInput,collection:"poi",key:"dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa"}}).then((function(t){e.setState({autoComplete:Object(s.a)(t.data.results)})})).catch((function(e){g.a.fire({title:"Network Error",text:"Try searching at a later time.",icon:"warning",confirmButtonText:"Okay"})}))}else a.length<3&&e.setState({showSuggestions:!1})}))},e.handleLibraryInputSelected=function(t){var a=t.target.value,n=e.state.autoComplete.filter((function(e){return e.name===a})),o=n[0].place.geometry.coordinates[1],r=n[0].place.geometry.coordinates[0],l=n[0].name,i={name:l,latitude:o,longitude:r};e.setState({selectedLibrary:i},(function(){e.setState({libraryInput:l,showSuggestions:!1})}))},e.handleFormSubmit=function(t){t.preventDefault(),e.state.libraryInput.length<3?g.a.fire({title:"No results",text:"Library name must be greater than 3 characters.",icon:"warning",confirmButtonText:"Okay"}):0===e.state.autoComplete.length||e.state.selectedRadius<1||e.state.selectedRadius>20?g.a.fire({title:"No results",text:"Try another search.",icon:"warning",confirmButtonText:"Okay"}):e.state.libraryInput.toLowerCase()===e.state.autoComplete[0].name.toLowerCase()?e.setState({selectedLibrary:{name:e.state.autoComplete[0].name,latitude:e.state.autoComplete[0].place.geometry.coordinates[1],longitude:e.state.autoComplete[0].place.geometry.coordinates[0]},showSuggestions:!1},e.getCoffeeShops):e.getCoffeeShops()},e.getCoffeeShops=function(){f()({url:"https://www.mapquestapi.com/search/v4/place",params:{key:"dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa",circle:"".concat(e.state.selectedLibrary.longitude,",").concat(e.state.selectedLibrary.latitude,",").concat(1e3*e.state.selectedRadius),sort:"relevance",q:"Coffee Shop",pageSize:50}}).then((function(t){var a=t.data.results;if(0===a.length)g.a.fire({title:"No results",text:"Try another search",icon:"warning",confirmButtonText:"Okay."});else{for(var n=Object(s.a)(a),o=n.length-1;o>0;o--){var r=Math.floor(Math.random()*(o+1)),l=n[o];n[o]=n[r],n[r]=l}n.splice(10),e.setState({coffeeShops:n},e.displayCoffeeShops)}})).catch((function(){g.a.fire({title:"No response",text:"Try searching again later.",icon:"warning",confirmButtonText:"Okay"})}))},e.displayCoffeeShops=function(){var t=e.state.selectedRadius,a=e.state.coffeeShops.map((function(e,t){var a=Object(i.a)(e.place.geometry.coordinates,2),n=a[0],o=a[1];return"".concat(o,",").concat(n,"|marker-md-").concat(t+1,"|")})).join("|"),n="".concat(e.state.selectedLibrary.latitude,",").concat(e.state.selectedLibrary.longitude,"|marker-md-350482||"),o="https://www.mapquestapi.com/staticmap/v5/map?key=".concat("dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa","&scalebar=true|bottom&locations=").concat(n).concat(a,"&size=500,600&type=light&shape=radius:").concat(t,"km|").concat(e.state.selectedLibrary.latitude,",").concat(e.state.selectedLibrary.longitude);e.setState({displayedMap:o,coffeeShopClicked:!1},(function(){document.querySelector("#mapAndResults").scrollIntoView(),setTimeout((function(){e.setState({isLoading:!1})}),1200)}))},e.handleBackButton=function(){e.displayCoffeeShops()},e.handleCoffeeShopSelected=function(t){var a=t.currentTarget.value,n=e.state.coffeeShops.filter((function(e){return e.id===a})),o=n[0].place.geometry.coordinates[1],r=n[0].place.geometry.coordinates[0],l={name:n[0].name,latitude:o,longitude:r},i=!e.state.coffeeShopClicked;e.setState({selectedCoffeeShop:l,directionsSessionID:"",coffeeShopClicked:i},e.getSelectedTransportation)},e.getSelectedTransportation=function(){var t="dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa",a=e.state,n=a.selectedLibrary,o=a.selectedCoffeeShop,r=a.modeOfTransportation;f()({url:"https://www.mapquestapi.com/directions/v2/route",params:{key:t,from:"".concat(n.latitude,",").concat(n.longitude),to:"".concat(o.latitude,",").concat(o.longitude),routeType:r,scalebar:"true|bottom",size:"600,600",type:"light"}}).then((function(a){var n=a.data.route.legs[0].maneuvers.map((function(e){return e.narrative})),o=a.data.route.sessionId;e.setState({directionsToCoffeeShop:n,directionsSessionID:o},(function(){var a="https://www.mapquestapi.com/staticmap/v5/map?session=".concat(e.state.directionsSessionID,"&key=").concat(t,"&scalebar=true|bottom&size=500,600&type=light&traffic=flow|cons|inc");e.setState({displayedMap:a})}))}))},e.handleRadiusSelected=function(t){var a=t.target.value;e.setState({selectedRadius:a})},e.handleTransportationChange=function(t){var a=t.target.value;e.setState({modeOfTransportation:a},e.getSelectedTransportation)},e.state={libraryInput:"",autoComplete:[],selectedLibrary:{},showSuggestions:!1,selectedRadius:5,coffeeShops:[],distanceBetween:"",selectedCoffeeShop:"",displayedMap:"",directionsToCoffeeShop:[],modeOfTransportation:"fastest",directionsSessionID:"",coffeeShopClicked:!1,isLoading:"true"},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this.handleLibraryInputChange,t=this.handleLibraryInputSelected,a=this.handleFormSubmit,n=this.handleRadiusSelected,r=this.handleCoffeeShopSelected,l=this.handleTransportationChange,i=this.handleBackButton,s=this.state,c=s.libraryInput,m=s.autoComplete,d=s.showSuggestions,u=s.displayedMap,p=s.coffeeShops,f=s.selectedCoffeeShop,h=s.modeOfTransportation,g=s.directionsToCoffeeShop,E=s.coffeeShopClicked,w=s.selectedRadius,k=s.selectedLibrary;return o.a.createElement("div",{className:"App"},o.a.createElement(S,null),o.a.createElement("main",{className:"mainContainer"},o.a.createElement("div",{className:"wrapper"},o.a.createElement(y,null),o.a.createElement(C,{libraryInput:c,handleLibraryInputChange:e,handleFormSubmit:a,handleRadiusSelected:n,handleTransportationChange:l,showSuggestions:d,autoComplete:m,handleLibraryInputSelected:t,selectedRadius:w})),this.state.coffeeShops.length>0?o.a.createElement("div",{className:"mapAndCoffeeShopBackground",id:"mapAndResults"},o.a.createElement("div",{className:"mapAndCoffeeShopContainer wrapper"},o.a.createElement("div",{className:"map"},this.state.isLoading?o.a.createElement("div",{className:"spinnerContainer"},o.a.createElement("div",{className:"loadingSpinner"})):o.a.createElement("img",{src:u,alt:""})),o.a.createElement(v,{handleCoffeeShopSelected:r,coffeeShops:p,coffeeShopClicked:E,selectedCoffeeShop:f,modeOfTransportation:h,handleTransportationChange:l,directionsToCoffeeShop:g,handleBackButton:i,selectedLibrary:k}))):null),o.a.createElement(b,null))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.ed889c9d.chunk.js.map