// fetchGet.js

// set up event listener for submit button
const exampleForm = document.getElementById('example-form');
console.log(exampleForm);
exampleForm.addEventListener("submit", handleFormSubmit);

// read values from the form fields
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    console.log('form is')
    console.log(form);
    const url = form.action;
    console.log('url is ' + url);
    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });
        console.log({ responseData });
    } catch (error) {
        console.error(error);
    }
}

// format the data as JSON and POST it to a 
// URL with fetch
async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formDataJsonString,
    };
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

