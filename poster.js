fetch("http://127.0.0.1:8000/company/", {
    method: "POST",
    body: JSON.stringify({
	"name":"mattress"
    }),
    headers: {
	"Content-type": "application/json; charset=UTF-8"
    }
})
    .then((response) => response.json())
    .then((json) => console.log(json));
