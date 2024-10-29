$(document).ready(function() {
    $('button').on('click', function(event) {
        event.preventDefault();
        var superheroID = $('#superhero-id').val();

        if (!superheroID) {
            $('#info-superhero').html('<div class="alert alert-warning">Por favor, ingresa un ID válido.</div>');
            return;
        }

        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/4905856019427443/${superheroID}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var html = `
                <h1>¡SuperHero Encontrado!</h1>
                <h2>Nombre: ${data.name}</h2>
                <img src="${data.image.url}" alt="superh" width="30%" class="img-fluid mx-auto d-block" style="border-radius: 2%">
                <hr> 
                <h3>Biografía:</h3>
                <p><strong>Nombre completo:</strong> ${data.biography['full-name']}</p>
                <p><strong>Alter ego:</strong> ${data.biography['alter-egos']}</p>
                <p><strong>Alias:</strong> ${data.biography['aliases'].join(', ')}</p>
                <p><strong>Lugar de nacimiento:</strong> ${data.biography['place-of-birth']}</p>
                <p><strong>Primera Aparición:</strong> ${data.biography['first-appearance']}</p>
                <p><strong>Editor:</strong> ${data.biography.publisher}</p>
                <p><strong>Alineación:</strong> ${data.biography.alignment}</p>
                <hr> 
                <h3>Apariencia:</h3>
                <p><strong>Género:</strong> ${data.appearance.gender}</p>
                <p><strong>Raza:</strong> ${data.appearance.race}</p>
                <p><strong>Altura:</strong> ${data.appearance.height.join(', ')}</p>
                <p><strong>Peso:</strong> ${data.appearance.weight.join(', ')}</p>
                <p><strong>Color de ojos:</strong> ${data.appearance['eye-color']}</p>
                <p><strong>Color de pelo:</strong> ${data.appearance['hair-color']}</p>
                <hr> 
                <h3>Conexiones:</h3>
                <p><strong>Ocupación:</strong> ${data.work.occupation}</p>
                <p><strong>Base:</strong> ${data.work.base}</p>
                <hr> 
                <h3>Trabajo:</h3>
                <p><strong>Afiliaciones:</strong> ${data.connections['group-affiliation']}</p>
                <p><strong>Relativos:</strong> ${data.connections.relatives}</p>
                `;
                $('#info-superhero').html(html);
                const powerStats = data.powerstats;
                const dataPoints = [
                    { y: parseFloat(powerStats.intelligence), label: "Inteligencia" },
                    { y: parseFloat(powerStats.strength), label: "Fuerza" },
                    { y: parseFloat(powerStats.speed), label: "Velocidad" },
                    { y: parseFloat(powerStats.durability), label: "Durabilidad" },
                    { y: parseFloat(powerStats.power), label: "Poder" },
                    { y: parseFloat(powerStats.combat), label: "Combate" }
                ];

                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    title: { 
                        text: "Habilidades del Superhéroe"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 240,
                        yValueFormatString: "##0.00\"%\"",
                        indexLabel: "{label} {y}",
                        dataPoints: dataPoints
                    }]
                });
                chart.render();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#info-superhero').html(`<p class="text-center">Hubo un: ${textStatus}. Intenta nuevamente.</p>`);
            }
        });
    });
});

