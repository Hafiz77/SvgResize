axios.get('http://localhost:3000/data')
    .then(resp => {
        data = resp.data;
        data.forEach(e => {
            console.log('e : ', e );
        });
    })
    .catch(error => {
        console.log(error);
    });