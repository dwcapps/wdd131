function participantTemplate(count) {
    // Function body
    return `<section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
              <label for="fname"> First Name<span>*</span></label>
              <input id="fname" type="text" name="fname" value="" required />
            </div>
            <div class="item activities">
              <label for="activity">Activity #<span>*</span></label>
              <input id="activity" type="text" name="activity" />
            </div>
            <div class="item">
              <label for="fee">Fee ($)<span>*</span></label>
              <input id="fee" type="number" name="fee" />
            </div>
            <div class="item">
              <label for="date">Desired Date <span>*</span></label>
              <input id="date" type="date" name="date" />
            </div>
            <div class="item">
              <p>Grade</p>
              <select>
                <option selected value="" disabled selected></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
            </div>
          </section>`
}

function successTemplate(info) {
    return `Thank you ${info.name} for registering. You have registered ${info.num} participants and owe $${info.fees} in Fees.`
}

let count = 1
function addParticipant(event) {
    count += 1
    event.target.insertAdjacentHTML("beforebegin", participantTemplate(count))
}

function submitForm(event){
    event.preventDefault();
    let info = {
        name: document.getElementById("adult_name").value,
        num: count,
        fees: totalFees()
    }
    document.querySelector("form").style.display = "none";
    document.getElementById("summary").insertAdjacentHTML("afterbegin", successTemplate(info))
}

function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);
    feeElements = [...feeElements];
    const total = feeElements.reduce((sum, input) => {
        return sum + (parseFloat(input.value) || 0); 
    }, 0);
    return total;
    }

document.getElementById("add").addEventListener("click", addParticipant)
document.querySelector("form").addEventListener("submit", submitForm)