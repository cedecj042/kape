let cakes = [
    { name: 'Black Forest', price: 190 },
    { name: "Devil's Delight", price: 180 },
    { name: "Smiley Cake", price: 130 },
    { name: "Waffle Chocolate", price: 100 },
    { name: "Pineapple Cake", price: 140 },
    { name: "Pan Borikat", price: 50 },
    { name: "Spiritual Cake", price: 150 },
    { name: "Relapse Cake", price: 75 },
    { name: "Blue Velvet Cake", price: 140 },
    { name: "Pan sa Liloan", price: 80 }
]

let coffee = [
    { name: 'Espresso', price: 70 },
    { name: "Picasso", price: 80 },
    { name: "Americano", price: 97 },
    { name: "Filipino", price: 67 },
    { name: "Cappucino", price: 78 },
    { name: "Doppio", price: 96 },
    { name: "Macchiato", price: 67 },
    { name: "Relapse Coffee", price: 98 },
    { name: "Mismo Coffee", price: 87 },
    { name: "French", price: 80 }
]

const cakeFragment = document.createDocumentFragment();
//create select html tag
const cakeSelect = document.createElement("select");
//set id to cakeSelect
cakeSelect.setAttribute("id", "cakeSelect");
cakeSelect.multiple = true;

//get element by id
const mycakes = document.getElementById("cakes");


cakes.forEach((cake) => {
    const myopt = document.createElement("option");
    myopt.setAttribute('value', cake.name);
    myopt.text = cake.name;
    cakeFragment.appendChild(myopt);
    // console.log(myopt);
});

cakeSelect.appendChild(cakeFragment);
mycakes.appendChild(cakeSelect);


const coffeeFragment = document.createDocumentFragment();
const coffeeSelect = document.createElement("select");
coffeeSelect.multiple = true;
coffeeSelect.setAttribute("id", "coffeeSelect");
const mycoffee = document.getElementById("coffee");

coffee.forEach((cof) => {
    const myopt = document.createElement("option");
    myopt.setAttribute('value', cof.name);
    myopt.text = cof.name;
    coffeeFragment.appendChild(myopt);
});

coffeeSelect.appendChild(coffeeFragment);
mycoffee.appendChild(coffeeSelect);


const cakeOption = document.getElementById("cakeSelect");
const coffeeOption = document.getElementById("coffeeSelect");
const myOrder = document.getElementById("myorder");


cakeOption.addEventListener("click", () => {
    let selectedCake = cakeOption.options[cakeOption.selectedIndex].value;

    cakes.forEach((cake) => {


        if (selectedCake == cake.name) {
            let tds = document.getElementsByTagName("td");
            for (var i = 0; i < tds.length; i++) {
                if (tds[i].innerText == selectedCake) {

                    let currentTr = tds[i].parentElement;
                    let currentqty = currentTr.childNodes[1].childNodes[0].childNodes[1].value |0;
                    currentqty++;
                    currentTr.childNodes[1].childNodes[0].childNodes[1].value= currentqty;
                    currentTr.childNodes[3].childNodes[0].innerText = (currentqty * cake.price).toFixed(2);
                    calculateTotal();
                    return;
                }
            }
            const tablerow = document.createElement("tr");
            const tdFragment = document.createDocumentFragment();


            const item = document.createElement("td");
            let header1 = document.createElement("h3");
            header1.textContent = cake.name;
            item.appendChild(header1);


            const qty = document.createElement("td");
            const tablediv = document.createElement("div");
            tablediv.setAttribute("class", "tablediv");

            const minbtn = document.createElement("button");
            minbtn.innerText = "-";
            minbtn.addEventListener("click", () => {

                let tr = minbtn.parentElement.parentElement.parentElement;
                let currcake = tr.childNodes[0].childNodes[0].innerText;
                cakes.forEach(curr => {
                    if (curr.name == currcake) {
                        subtractbutton(tr);

                        calculateTotal();
                        return;
                    }
                });
            });
            tablediv.appendChild(minbtn);

            const qtyInput = document.createElement("input");
            qtyInput.addEventListener("change", function () {
                let tr = qtyInput.parentElement.parentElement.parentElement;
                let currcake = tr.childNodes[0].childNodes[0].innerText;
                // console.log(tr);
                cakes.forEach(curr => {
                    // console.log(curr.name + " = " + currcake);
                    if (curr.name == currcake) {
                        let currentvalue = tr.childNodes[1].childNodes[0].childNodes[1].value | 0;
                        console.log(currentvalue);
                        tr.childNodes[1].childNodes[0].value = currentvalue;
                        tr.childNodes[3].childNodes[0].innerText = (currentvalue * curr.price).toFixed(2);
                        calculateTotal();
                        return;
                    }
                });
            });
            qtyInput.value = 1;
            qty.appendChild(qtyInput);
            tablediv.appendChild(qtyInput);
            qty.appendChild(tablediv);

            const addbtn = document.createElement("button");
            addbtn.innerText = "+";
            addbtn.addEventListener("click", () => {

                let tr = minbtn.parentElement.parentElement.parentElement;
                let currcake = tr.childNodes[0].childNodes[0].innerText;
                cakes.forEach(curr => {
                    if (curr.name == currcake) {
                        let inputvalue = tr.childNodes[1].childNodes[0].childNodes[1].value | 0;
                        if (inputvalue >= 1) {
                            inputvalue++;
                            addbutton(tr, currcake, inputvalue);
                        }
                        calculateTotal();
                        return;
                    }
                });
            });
            tablediv.appendChild(addbtn);
            const price = document.createElement("td");
            let header2 = document.createElement("h3");
            header2.textContent = cake.price.toFixed(2);
            price.appendChild(header2);

            const amount = document.createElement("td");
            amount.setAttribute("name", "amount");
            amount.innerHTML = "<h3>" + cake.price.toFixed(2) + "</h3";

            tdFragment.appendChild(item);
            tdFragment.appendChild(qty);
            tdFragment.appendChild(price);
            tdFragment.appendChild(amount);
            tablerow.appendChild(tdFragment);
            myOrder.appendChild(tablerow);
            calculateTotal();
            return;
        }
    });
});


coffeeOption.addEventListener("click", () => {
    let selectedCoffee = coffeeOption.options[coffeeOption.selectedIndex].value;

    coffee.forEach(cof => {
        if (selectedCoffee == cof.name) {
            let tds = document.getElementsByTagName("td");
            let currentTr;

            for (let i = 0; i < tds.length; i++) {
                if (selectedCoffee == tds[i].innerText) {

                    let currentTr = tds[i].parentElement;
                    let currentqty = currentTr.childNodes[1].childNodes[0].childNodes[1].value |0;
                    currentqty++;
                    currentTr.childNodes[1].childNodes[0].childNodes[1].value= currentqty;
                    currentTr.childNodes[3].childNodes[0].innerText = (currentqty * cof.price).toFixed(2);
                    calculateTotal();
                    return;
                }
            }


            const fragment = document.createDocumentFragment();
            const table = document.getElementById("myorder");
            const tr = document.createElement("tr");

            const item = document.createElement("td");
            item.innerHTML = "<h3>" + cof.name + "</h3>";
            fragment.appendChild(item);


            const tablediv = document.createElement("div");
            tablediv.setAttribute("class", "tablediv");

            const minbtn = document.createElement("button");
            minbtn.innerText = "-";
            minbtn.addEventListener("click", () => {

                let tr = minbtn.parentElement.parentElement.parentElement;
                let currcoffee = tr.childNodes[0].childNodes[0].innerText;
                coffee.forEach(cof => {
                    if (cof.name == currcoffee) {
                        subtractbutton(tr);

                        calculateTotal();
                        return;
                    }
                });
            });
            tablediv.appendChild(minbtn);

            const qty = document.createElement("td");
            const qtyInput = document.createElement("input");
            qtyInput.addEventListener("change", () => {
                let tr = qtyInput.parentElement.parentElement.parentElement;
                let currcoffee = tr.childNodes[0].childNodes[0].innerText;
                
                coffee.forEach(cof => {
                    if (cof.name == currcoffee) {
                        let currentvalue = tr.childNodes[1].childNodes[0].childNodes[1].value | 0;

                        tr.childNodes[1].childNodes[0].value = currentvalue;
                        tr.childNodes[3].childNodes[0].innerText = (currentvalue * cof.price).toFixed(2);
                        calculateTotal();
                        return;
                    }
                })
            });
            qtyInput.value = "1";
            tablediv.appendChild(qtyInput);
            qty.appendChild(tablediv);
            fragment.appendChild(qty);


            const addbtn = document.createElement("button");
            addbtn.innerText = "+";
            addbtn.addEventListener("click", () => {

                let tr = minbtn.parentElement.parentElement.parentElement;
                let mycof = tr.childNodes[0].childNodes[0].innerText;
                coffee.forEach(cof => {
                    if (cof.name == mycof) {
                        let inputvalue = tr.childNodes[1].childNodes[0].childNodes[1].value | 0;
                        if (inputvalue >= 1) {
                            inputvalue++;
                            addbutton(tr, mycof, inputvalue);
                        }
                        calculateTotal();
                        return;
                    }
                });
            });
            tablediv.appendChild(addbtn);

            const price = document.createElement("td");
            price.innerHTML = "<h3>" + cof.price.toFixed(2) + "</h3";
            fragment.appendChild(price);

            const amount = document.createElement("td");
            amount.setAttribute("name", "amount");
            amount.innerHTML = "<h3>" + cof.price.toFixed(2) + "</h3";
            fragment.appendChild(amount);

            tr.appendChild(fragment);
            table.appendChild(tr);
            calculateTotal();
            return;
        }
    });
})


function calculateTotal() {

    let total = document.getElementsByName("amount");
    let sum = 0;
    for (let i = 0; i < total.length; i++) {
        // console.log(total[i].childNodes[0].innerText);

        let str = total[i].childNodes[0].innerText;
        let stramount = str.replace(".00", "");
        let amount = stramount | 0;
        sum += amount;

    }
    let totalamount = document.getElementById("total");
    totalamount.innerHTML = "<h3>" + sum.toFixed(2) + "</h3>";
    sum = 0;

}

function addbutton(tr, currcake, inputvalue) {

    tr.childNodes[1].childNodes[0].childNodes[1].value = inputvalue;
    let pricestr = tr.childNodes[2].childNodes[0].innerText.replace(".00", "");
    let price = pricestr | 0;
    let str = tr.childNodes[3].childNodes[0].innerText;
    let stramount = str.replace(".00", "");
    let amount = stramount | 0;

    amount = price * inputvalue;
    tr.childNodes[3].childNodes[0].innerText = amount.toFixed(2);
    console.log(tr.childNodes[2].childNodes[0].innerText);
}


function subtractbutton(tr) {
    let inputvalue = tr.childNodes[1].childNodes[0].childNodes[1].value | 0;

    if (inputvalue >= 1) {
        inputvalue--;

        tr.childNodes[1].childNodes[0].childNodes[1].value = inputvalue;
        if (inputvalue != 0) {
            let pricestr = tr.childNodes[2].childNodes[0].innerText.replace(".00", "");
            let price = pricestr | 0;
            let str = tr.childNodes[3].childNodes[0].innerText;
            let stramount = str.replace(".00", "");
            let amount = stramount | 0;
            amount = price * inputvalue;
            tr.childNodes[3].childNodes[0].innerText = amount.toFixed(2);
            console.log(tr.childNodes[2].childNodes[0].innerText);
        }
    }
    if (inputvalue == 0) {
        tr.remove();
    }
}