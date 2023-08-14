const categoryInput = document.getElementById('category');
const gallery = document.getElementById('gallery');
const btn = document.getElementById('btn');

btn.addEventListener('click', function() {
    const category = categoryInput.value;

    fetch(`https://api.unsplash.com/search/photos?query=${category}&per_page=12`, {
            headers: {
                Authorization: 'Client-ID OUIMmXPR-gVQS5B2Ne07KBKDQeu1V5wqp3xyXtRDbQk'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            if (data.total == 0) {
                gallery.innerHTML = '<h1 style="color: red;">Image Not Found!!!!!</h1>'
            } else {
                
            gallery.innerHTML = '';

            data.results.forEach(photo => {
                const picture = document.createElement('div');
                picture.className = 'picture';

                const img = document.createElement('img');
                img.src = photo.urls.regular;
                img.alt = photo.alt_description;
                picture.appendChild(img);

                const author = document.createElement('p');
                author.innerHTML = `<b>Author</b>: <a href="${photo.user.links.html}" target="_blank">${photo.user.name}</a>`;
                picture.appendChild(author);

                const description = document.createElement('p');
                description.innerHTML = `<p><b>Description</b>: ${photo.alt_description || 'N/A'}</p>`;
                picture.appendChild(description);

                const link = document.createElement('p');
                link.innerHTML = `<b>Link</b>: <a href="${photo.links.html}" target="_blank">${photo.links.html}</a>`;
                picture.appendChild(link);

                gallery.appendChild(picture);
            
            });
        }
        })
        .catch(error => {
            console.log('Error:', error);
        });
});
