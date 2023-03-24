const notasForm = document.getElementById("notas-form");
const notasTable = document.getElementById("notas-table");
const resetBtn = document.getElementById("reset-btn");

const notasStorage = localStorage.getItem('notas');
const notas = notasStorage ? JSON.parse(notasStorage) : [];

function guardarNotas() {
    localStorage.setItem('notas', JSON.stringify(notas));
}

function actualizarTabla() {
    notasTable.innerHTML = '';
    notas.forEach(({ nombre, nota1, nota2, nota3, nota4, nota5, promedio }) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nombre}</td>
            <td>${nota1}</td>
            <td>${nota2}</td>
            <td>${nota3}</td>
            <td>${nota4}</td>
            <td>${nota5}</td>
            <td>${promedio}</td>
        `;
        notasTable.appendChild(newRow);
    });
}

actualizarTabla();

notasForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const nota1 = parseInt(document.getElementById("nota1").value);
    const nota2 = parseInt(document.getElementById("nota2").value);
    const nota3 = parseInt(document.getElementById("nota3").value);
    const nota4 = parseInt(document.getElementById("nota4").value);
    const nota5 = parseInt(document.getElementById("nota5").value);

    const promedio = (nota1 + nota2 + nota3 + nota4 + nota5) / 5;

    notas.push({ nombre, nota1, nota2, nota3, nota4, nota5, promedio });

    guardarNotas();
    actualizarTabla();
    notasForm.reset();
    Swal.fire({
        title: 'Notas guardadas',
        text: 'Las notas han sido guardadas correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
    });
});

resetBtn.addEventListener("click", () => {
    localStorage.removeItem('notas');
    notas.splice(0, notas.length);
    actualizarTabla();
    Swal.fire({
        title: 'Notas reiniciadas',
        text: 'Las notas han sido reiniciadas correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
    });
});