const select = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translateBtn");
const fromText = document.querySelector(".fromText");
const toText = document.querySelector(".toText");
const exchangeBtn = document.querySelector(".exchange");
const fromIcon = document.getElementById("fromIcon");
const toIcon = document.getElementById("toIcon");
const fromCpyBtn = document.querySelector(".fromCopyBtn");
const toCpyBtn = document.querySelector(".toCopyBtn");

select.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "te-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});
    
    translateBtn.addEventListener("click", () => {   
        let content = fromText.value;
    fromContent = select[0].value;
    transContent = select[1].value;
      // If 'fromText' is empty, clear the 'toText'
      if (!content) {
        toText.value = "";
        return;
    }
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromContent}&tl=${transContent}&dt=t&q=${encodeURIComponent(content)}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            toText.value = data[0][0][0]; // The translated text
        } else {
            toText.value = "Translation error."; // Error message
        }
    })
    .catch(err => {
        toText.value = "Error fetching translation."; // Display error if something goes wrong
        console.error("Error:", err);
      
});
    
})
exchangeBtn.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = select[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    select[0].value = select[1].value;
    select[1].value = tempLang;
});
fromIcon.addEventListener("click", ()=>{
    console.log("icon is clicked");
    let fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = select[0].value;
    speechSynthesis.speak(fromTalk);
})
toIcon.addEventListener("click", ()=>{
    console.log("icon is clicked");
    let toTalk = new SpeechSynthesisUtterance(toText.value);
    toTalk.lang = select[0].value;
    speechSynthesis.speak(toTalk);
})
fromCpyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(fromText.value);

})
toCpyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(toText.value);
})

