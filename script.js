window.onload = function (e) {
    var topic = document.getElementById("diary-topic");
    var entry = document.getElementById("diary-input");
    var history = document.getElementById("diary-history");
    var submit = document.getElementById("submit");
    var output = document.getElementById("output");

    function submitBtn (event) {
        console.log('in')
        event.preventDefault();
        var subject = topic.value;
        var diaryText = entry.value;

        var div = document.createElement("div");
        div.innerHTML = subject + " " + diaryText;
        // dOutput.innerHTML = subject + " " + entries;
        // // in the above onclick, get the text from the users input, and log it to the console
        
        // console.log(subject);
        // console.log(entries);
        var diaryEntry = {
            subject: subject,
            diaryText: diaryText,
            date: Date.now()
        }
        var currentDiary = JSON.parse(localStorage.getItem('diaryEntries'))
        console.log(currentDiary)
        if (!Array.isArray(currentDiary)) currentDiary = []
        currentDiary.push(diaryEntry)
        console.log(currentDiary)
        localStorage.setItem('diaryEntries', JSON.stringify(currentDiary));
        loadEntries()
    }

    function loadEntries () {
        history.innerHTML = ''
        var currentDiary = JSON.parse(localStorage.getItem('diaryEntries'))
        for (var i = 0; i < currentDiary.length; i++) {
            var div = document.createElement('div')
            div.classList.add('row')
            var html = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${currentDiary[i].subject}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${new Date(currentDiary[i].date)}</h6>
                <p class="card-text">${currentDiary[i].diaryText}</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
                </div>
            </div>
            `
            div.innerHTML = html
            history.append(div)
        }
    }
    submit.onclick = submitBtn
    loadEntries()
}