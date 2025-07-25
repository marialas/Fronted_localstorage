import { formatDate, formatPrice } from './utils.js';

const tableBody = document.querySelector('#productsTable tbody');
const reloadBtn = document.getElementById('reloadBtn');
const statusMessage = document.getElementById('statusMessage');


const loadData = async () => {
    try {
        statusMessage.innerHTML = `<div class="loading-message">Cargando...</div>`;
        const response = await fetch('/api/products');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || `Error en los datos recibidos`);
        }

        if (!result.data || result.data.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5">No hay productos disponibles</td>
                </tr>
            `;
            statusMessage.innerHTML = `<div class="info-message">No hay productos</div>`;
            return;
        }

        // Mostrar productos en la tabla
        tableBody.innerHTML = result.data.map(products => `
            <tr>
                <td>${products.id}</td>
                <td>${products.name || 'N/A'}</td>
                <td>${formatPrice(products.price)}</td>
                <td>${products.stock ?? 'N/A'}</td>
                <td>${products.created_at ? formatDate(product.created_at) : 'N/A'}</td>
            </tr>
        `).join('');

        statusMessage.innerHTML = `
            <div class="success-message">
                Datos cargados correctamente (${new Date().toLocaleTimeString()})
            </div>
        `;

    } catch (error) {
        console.error('Error al cargar datos:', error);
        showError(`Error: ${error.message}`);
    }
};

reloadBtn.addEventListener('click', loadData);
document.addEventListener('DOMContentLoaded', loadData);
