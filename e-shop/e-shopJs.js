
// Book class
class Book{
    constructor(imgLink, bookName, price, id) {
        this.imgLink = imgLink
        this.bookName = bookName
        this.price = price
        this.id = id
    }
    
}

let book1 = new Book("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.morkitaplik.com%2Fwp-content%2Fuploads%2F2014%2F01%2Fkurk-mantolu-madonna.jpg&f=1&nofb=1", "Kürk Mantolu Madonna", 25, "b1")
let book2 = new Book("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkitapokupdfindir.com%2Fwp-content%2Fuploads%2F2020%2F11%2FYabanci-kitabini-PDF-indir-ePUB-PDF.jpeg&f=1&nofb=1", "Yabancı", 10, "b2")
let book3 = new Book("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.safakkitap.com.tr%2FUploads%2FUrunResimleri%2Fbuyuk%2Fcalikusu--dbd7.jpg&f=1&nofb=1", "Calıkuşu", 20, "b3")
let library = [book1, book2, book3]
let book_basket = []


// Clears the form
function clearForms(){
    let elm = document.getElementsByTagName("input")
    for(let i=0; i<elm.length; i++){
        elm[i].value=""
    }
}


// Shows the library section
function hide_home_page(){
    let library = document.getElementsByClassName("Library")
    let addBooksToLibrary = document.getElementsByClassName("addBooksToLibrary")
    let basket = document.getElementsByClassName("basket")
    for(let i=0; i<library.length; i++){
        library[i].style.display  = "none"
    }
    
    for(let i=0; i<addBooksToLibrary.length; i++){
        addBooksToLibrary[i].style.display = ""
    }
    for(let i=0; i<basket.length; i++){
        basket[i].style.display = "none"
    }

}

// Shows the add book section
function unhide_home_page(){
    let library = document.getElementsByClassName("Library")
    let addBooksToLibrary = document.getElementsByClassName("addBooksToLibrary")
    let basket = document.getElementsByClassName("basket")
    for(let i=0; i<library.length; i++){
        library[i].style.display = ""
    }
    
    for(let i=0; i<addBooksToLibrary.length; i++){
        addBooksToLibrary[i].style.display = "none"
    }
    for(let i=0; i<basket.length; i++){
        basket[i].style.display = "none"
    }
}

// Shows the basket section
function visit_basket(){
    let library = document.getElementsByClassName("Library")
    let addBooksToLibrary = document.getElementsByClassName("addBooksToLibrary")
    let basket = document.getElementsByClassName("basket")
    for(let i=0; i<library.length; i++){
        library[i].style.display = "none"
    }
    for(let i=0; i<addBooksToLibrary.length; i++){
        addBooksToLibrary[i].style.display = "none"
    }
    for(let i=0; i<basket.length; i++){
        basket[i].style.display = ""
    }
    show_basket()

}

// Creates the book object and adding them into library array
function create_book_obj(imgLink, bookName, price, id){
    let oneBook = new Book(imgLink, bookName, price, id)
    library.push(oneBook)
}


let i = 4
function add_book(){
    // Getting the user values for new book element
    let imgLink = document.getElementById("imgLink").value
    let bookName = document.getElementById("bookTitle").value
    let price = parseInt(document.getElementById("price").value)
    let sp_id = "b"+i
    if(imgLink == "" && bookName == "" && price == "" || price <= 0){
        alert("Fill all the places and give proper price")
        return
    }
    // Creating book objects and adding into library array
    create_book_obj(imgLink, bookName, price, sp_id)
    // Creating image element
    let bookImg = document.createElement("img")
    bookImg.src = imgLink
    // Creating title element
    let name = document.createElement("h2")
    let nameNode = document.createTextNode(bookName)
    name.appendChild(nameNode)
    // Creating price element
    let prc = document.createElement("p")
    let nodePrc = document.createTextNode(price +" TL")
    prc.appendChild(nodePrc)
    // Creating button element
    let button =document.createElement("button")
    button.innerHTML = "Add To Card"
    button.id = "b"+i
    button.onclick = function () { add_to_basket(button.id)}
    // Creating div for book class
    let div1 = document.createElement("div")
    div1.className += "Book"
    div1.appendChild(bookImg)
    div1.appendChild(name)
    div1.appendChild(prc)
    div1.appendChild(button)
    // Adding the book into library class
    let div2 = document.getElementById("div2")
    div2.appendChild(div1)
    clearForms()
    i++
}


function add_to_basket(id){
    for(let i=0; i<library.length; i++){
        if(library[i].id == id){
            book_basket.push(library[i])
            show_basket(library[i])
            alert(library[i].bookName + " is added to the cart.")
        }
    }
}


let total_cost = 0
function show_basket(book_basket){
    // Creating image data
    let img_td = document.createElement("td")
    img_td.className += "product"
    let bookImg = document.createElement("img")
    bookImg.src = book_basket.imgLink
    img_td.appendChild(bookImg)
        
    // Creating title data
    let title_td = document.createElement("td")
    title_td.className += "title"
    let book_title = document.createElement("h3")
    book_title.innerHTML = book_basket.bookName
    title_td.appendChild(book_title)

    // Creating price data
    let price_td = document.createElement("td")
    let price_p = document.createElement("p")
    price_p.innerHTML = book_basket.price +" TL"
    price_td.appendChild(price_p)

    // Creating tablerow
    let tr = document.createElement("tr")
    tr.id = book_basket.id
    tr.appendChild(img_td)
    tr.appendChild(title_td)
    tr.appendChild(price_td)
    // Adding the tablerow into table
    let bs_table = document.getElementById("basket_table")
    bs_table.appendChild(tr)
    total_cost += book_basket.price
    let total_cost_text = document.getElementById("t_cost")
    total_cost_text.innerHTML = "Total Cost: "+ total_cost +" TL"

}

function complete_payment(){
    let name = document.getElementById("name").value
    let address = document.getElementById("address").value
    let country = document.getElementById("country").value
    let city = document.getElementById("city").value
    if(name == "" && address == "" && country == "" || city == ""){
        alert("Please fill all the blanks")
        return
    }
    window.location = "e-shopHtml.html"
    alert("Your order has been received thanks.")
}

function buy_section(){
    if(book_basket.length == 0){
        alert("Please add some book!")
        return
    }
    window.location = "buy-section.html"
}
