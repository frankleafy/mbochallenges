 //init
 var singleChallengeUrl = "https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Current%20Challenges&filter=";
 var app;
 var md = new Remarkable();

 //Capture back/forward button clicks
 window.onhashchange = function() 
 { 
    if(app.currentPage != "" && "#"+ app.currentPage != document.location.hash)
    {
       var page = document.location.hash.substring(1);
        for (var i = 0; i < app.menuItems.length; i++) 
        { 
            if(app.menuItems[i].title == page)
            {
                setContentContainer(i);
                break;
            }
        }
    }
}

 window.onload = function () {
        app = new Vue(
        {
            el: '#app',
            data: {
                input: '# hello',
                currentPage: '',
                menuItems :[
                    {title:"Home", pageTitle:"__MBO__*Challenges*, purposeful learning", hidden:false, section:"home", container:"home", data:[], content:"", loaded:false, selected:true},
                    {title:"Green", pageTitle:"Sustainability challenges", hidden:false, section:"green", container:"green", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Green%20Challenges", loaded:false, selected:false},
                    {title:"Social", pageTitle:"Social challenges", hidden:false, section:"social", container:"social", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Social%20Challenges", loaded:false, selected:false},
                    {title:"Commercial", pageTitle:"Commercial challenges", hidden:false, section:"commercial", container:"commercial", data:[], content:"https://script.google.com/macros/s/AKfycbx4cVgWqXOtoRqvX70nqhlP0N6dslt2uUoPTymyZwsB-cE81-H8/exec?view=Commercial%20Challenges", loaded:false, selected:false},
                    {title:"Favorites", pageTitle:"Your favorites", hidden:false, section:"favorites", container:"favorites", data:[], content:"", loaded:false, selected:false},
                    {title:"Details", pageTitle:"Details of this challenge", hidden:true, section:"detail", container:"detail", data:[], content:"", loaded:false, selected:false},
                    {title:"Apply", pageTitle:"Apply for a challenge", hidden:false, section:"apply", container:"apply", data:[], content:"", loaded:false, selected:false},
                    {title:"Events", pageTitle:"Oncoming events", hidden:false, section:"events", container:"events", data:[], content:"", loaded:false, selected:false},
                    {title:"About", pageTitle:"About MBO Challenges", hidden:false, section:"about", container:"about", data:[], content:"", loaded:false, selected:false},
                    {title:"Contact", pageTitle:"Contact us", hidden:false, section:"contact", container:"contact", data:[], content:"", loaded:false, selected:false},
                    ],
                selectedItems: [],
                itemDetails:[]
            },
            mounted: function(){
                   if(localStorage.bookmarks) this.selectedItems = JSON.parse(localStorage.bookmarks);
                
            },
            methods: 
            {               
                loadItems : function(target)
                {
                    loadItems(target)
                },
                selectItem : function(challenge)
                {
                    this.selectedItems.push(challenge);
                    localStorage.bookmarks = JSON.stringify(this.selectedItems);
                }
                ,
                deleteItem : function(challenge)
                {
                    this.$delete(this.selectedItems, challenge);     
                    localStorage.bookmarks = JSON.stringify(this.selectedItems);               
                    
                },
                getItemDetails: function(challenge)
                {
                    if(this.itemDetails.length > 0)this.itemDetails.pop();
                    this.itemDetails.push(challenge);      
                    setContentContainer(5);  
                },
                compiledMarkdown: function (source) 
                {
                  return marked(source, { sanitize: true })
                }
                
            },
            computed: 
            {
    
            }
        });


       
        
    };

function setContentContainer(target)
{
    //document.getElementById("titleHeader").innerText = app.menuItems[target].pageTitle;
    for (var i = 0; i < app.menuItems.length; i++) 
    { 
        var placeholder = document.getElementById(app.menuItems[i].container);
        
        if(i == target)
        {
            app.currentPage = app.menuItems[i].title;
            app.menuItems[i].selected = true;
            //alert('update:'+app.menuItems[i].title);
            if(placeholder)placeholder.style.cssText = 'block';           
        }
        else
        {
            if(placeholder)placeholder.style.display = 'none';
            app.menuItems[i].selected = false;
        }
    }
    
}

  
function loadItems(target)
{
    // Init variables
    var self = app;

    setContentContainer(target)

    if(self.menuItems[target].content !="" && !self.menuItems[target].loaded)
    {
        document.getElementById("status").style.display = 'block';
        axios.get
        (
            self.menuItems[target].content, //google script, NOT Airtable
            { 
            }
        ).then(function(response)
        {
            document.getElementById("status").style.display = 'none';
            self.menuItems[target].data=response.data.records;
            self.menuItems[target].loaded = true;
            
        }).catch
        (
            function(error)
            {
            console.log(error)
            document.getElementById("status").style.display = 'none';
            }
        )
    }
}
