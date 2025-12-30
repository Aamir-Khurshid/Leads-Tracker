let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('del-all-btn');
const ulEl = document.getElementById('ul-el');
const leadsFromStorage = JSON.parse(localStorage.getItem('myLeads'));

if(leadsFromStorage){
    myLeads = leadsFromStorage;
    render(myLeads)
}


tabBtn.addEventListener('click',()=>{
    // console.log(tabs[0].url)
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads',JSON.stringify(myLeads));
        render(myLeads);
    })
    
})

function render(leads) {
    let listItems = '';
    for (let i = 0; i <leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">
                ${leads[i]}
            </a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value);  
    inputEl.value = '';
    localStorage.setItem('myLeads',JSON.stringify(myLeads));
    render(myLeads);
})

deleteBtn.addEventListener('dblclick',()=>{
    localStorage.clear();
    myLeads = []
    render(myLeads);
})