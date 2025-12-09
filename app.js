// scripts/app.js - Financial Dashboard with View Switching

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Chart Management
let currentChart = null;
let currentView = 'overview';
const ctx = document.getElementById('mainChart');

if (ctx) {
    const chartContext = ctx.getContext('2d');

    // Financial Mock Data by View
    const viewData = {
        overview: {
            charts: {
                revenue: {
                    title: 'Revenue vs Budget (Last 6 Months)',
                    type: 'line',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Actual Revenue',
                            data: [385000, 420000, 395000, 445000, 410000, 458000],
                            borderColor: '#87CEEB',
                            backgroundColor: 'rgba(135, 206, 235, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }, {
                            label: 'Budgeted Revenue',
                            data: [400000, 400000, 400000, 420000, 420000, 440000],
                            borderColor: '#ff9800',
                            backgroundColor: 'rgba(255, 152, 0, 0.05)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            tension: 0.4,
                            fill: false
                        }]
                    }
                },
                profit: {
                    title: 'Net Profit Trend',
                    type: 'bar',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Net Profit',
                            data: [72000, 85000, 78000, 92000, 81000, 95000],
                            backgroundColor: '#4caf50',
                            borderWidth: 0
                        }, {
                            label: 'Target Profit',
                            data: [75000, 80000, 80000, 85000, 85000, 90000],
                            backgroundColor: 'rgba(255, 152, 0, 0.5)',
                            borderWidth: 0
                        }]
                    }
                },
                cashflow: {
                    title: 'Operating Cash Flow',
                    type: 'line',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Cash Inflow',
                            data: [420000, 455000, 430000, 485000, 445000, 498000],
                            borderColor: '#4caf50',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true
                        }, {
                            label: 'Cash Outflow',
                            data: [350000, 370000, 355000, 390000, 365000, 410000],
                            borderColor: '#f44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true
                        }]
                    }
                }
            }
        },
        profitability: {
            charts: {
                margins: {
                    title: 'Profit Margins Comparison',
                    type: 'bar',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Gross Margin %',
                            data: [48.5, 49.2, 48.8, 49.5, 49.1, 49.3],
                            backgroundColor: '#87CEEB',
                            borderWidth: 0
                        }, {
                            label: 'Operating Margin %',
                            data: [20.8, 21.2, 20.5, 21.8, 21.3, 21.5],
                            backgroundColor: '#4caf50',
                            borderWidth: 0
                        }, {
                            label: 'Net Margin %',
                            data: [18.2, 19.1, 18.5, 19.8, 19.2, 19.7],
                            backgroundColor: '#ff9800',
                            borderWidth: 0
                        }]
                    }
                },
                revenue: {
                    title: 'Revenue Breakdown by Product',
                    type: 'doughnut',
                    data: {
                        labels: ['Product A', 'Product B', 'Product C', 'Services'],
                        datasets: [{
                            data: [35, 28, 22, 15],
                            backgroundColor: ['#87CEEB', '#4caf50', '#ff9800', '#f44336'],
                            borderWidth: 0
                        }]
                    }
                },
                growth: {
                    title: 'Year-over-Year Growth',
                    type: 'line',
                    data: {
                        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                        datasets: [{
                            label: 'Revenue Growth %',
                            data: [12.5, 14.2, 13.8, 15.3],
                            borderColor: '#87CEEB',
                            backgroundColor: 'rgba(135, 206, 235, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }, {
                            label: 'Profit Growth %',
                            data: [8.2, 9.5, 7.8, 8.2],
                            borderColor: '#4caf50',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }]
                    }
                }
            }
        },
        cashflow: {
            charts: {
                flow: {
                    title: 'Cash Flow Statement',
                    type: 'bar',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Operating Activities',
                            data: [70000, 85000, 75000, 95000, 80000, 88000],
                            backgroundColor: '#4caf50',
                            borderWidth: 0
                        }, {
                            label: 'Investing Activities',
                            data: [-25000, -30000, -15000, -20000, -25000, -18000],
                            backgroundColor: '#ff9800',
                            borderWidth: 0
                        }, {
                            label: 'Financing Activities',
                            data: [-10000, -5000, -8000, -12000, -6000, -9000],
                            backgroundColor: '#f44336',
                            borderWidth: 0
                        }]
                    }
                },
                balance: {
                    title: 'Cash Balance Trend',
                    type: 'line',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Cash Balance',
                            data: [1050000, 1100000, 1152000, 1215000, 1179000, 1245000],
                            borderColor: '#87CEEB',
                            backgroundColor: 'rgba(135, 206, 235, 0.2)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }]
                    }
                },
                runway: {
                    title: 'Cash Runway Analysis',
                    type: 'line',
                    data: {
                        labels: ['Current', '+1M', '+2M', '+3M', '+4M', '+5M', '+6M'],
                        datasets: [{
                            label: 'Projected Cash',
                            data: [1245000, 1210000, 1175000, 1140000, 1105000, 1070000, 1035000],
                            borderColor: '#87CEEB',
                            backgroundColor: 'rgba(135, 206, 235, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true
                        }, {
                            label: 'Minimum Required',
                            data: [500000, 500000, 500000, 500000, 500000, 500000, 500000],
                            borderColor: '#f44336',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            tension: 0,
                            fill: false
                        }]
                    }
                }
            }
        },
        efficiency: {
            charts: {
                ratios: {
                    title: 'Efficiency Ratios Trend',
                    type: 'line',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'ROE %',
                            data: [17.2, 17.8, 17.5, 18.2, 18.0, 18.5],
                            borderColor: '#87CEEB',
                            backgroundColor: 'rgba(135, 206, 235, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }, {
                            label: 'ROA %',
                            data: [11.5, 11.8, 11.6, 12.1, 11.9, 12.3],
                            borderColor: '#4caf50',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }]
                    }
                },
                turnover: {
                    title: 'Asset Turnover Ratios',
                    type: 'bar',
                    data: {
                        labels: ['Inventory', 'Receivables', 'Payables', 'Total Assets'],
                        datasets: [{
                            label: 'Turnover (times)',
                            data: [8.5, 6.2, 5.8, 2.4],
                            backgroundColor: ['#87CEEB', '#4caf50', '#ff9800', '#f44336'],
                            borderWidth: 0
                        }]
                    }
                },
                working: {
                    title: 'Working Capital Efficiency',
                    type: 'line',
                    data: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Working Capital',
                            data: [780000, 795000, 810000, 825000, 835000, 845000],
                            borderColor: '#87CEEB',
                            backgroundColor: 'rgba(135, 206, 235, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }]
                    }
                }
            }
        }
    };

    // Render Chart Function
    function renderChart(chartType) {
        if (currentChart) {
            currentChart.destroy();
        }

        const config = viewData[currentView].charts[chartType];
        if (!config) return;

        const chartTitle = document.getElementById('chart-title');
        if (chartTitle) {
            chartTitle.textContent = config.title;
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#e0e0e0', font: { size: 12 } },
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: '#121212',
                    titleColor: '#87CEEB',
                    bodyColor: '#e0e0e0',
                    borderColor: '#333333',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (currentView === 'profitability' && chartType === 'margins') {
                                    label += context.parsed.y.toFixed(1) + '%';
                                } else if (currentView === 'efficiency' && (chartType === 'ratios' || chartType === 'turnover')) {
                                    label += context.parsed.y.toFixed(1) + (chartType === 'ratios' ? '%' : 'x');
                                } else {
                                    label += '$' + context.parsed.y.toLocaleString();
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: config.type !== 'doughnut' ? {
                x: {
                    ticks: { color: '#a0a0a0' },
                    grid: { color: '#333333', display: false }
                },
                y: {
                    ticks: {
                        color: '#a0a0a0',
                        callback: function (value) {
                            if (currentView === 'profitability' && chartType === 'margins') {
                                return value + '%';
                            } else if (currentView === 'efficiency' && (chartType === 'ratios' || chartType === 'turnover')) {
                                return value + (chartType === 'ratios' ? '%' : 'x');
                            }
                            return '$' + (value / 1000) + 'K';
                        }
                    },
                    grid: { color: '#333333' }
                }
            } : {}
        };

        currentChart = new Chart(chartContext, {
            type: config.type,
            data: config.data,
            options: options
        });
    }

    // Chart Button Controls
    const chartButtons = document.querySelectorAll('.chart-btn');
    chartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            chartButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const chartType = btn.getAttribute('data-chart');
            renderChart(chartType);
        });
    });

    // Update chart controls based on view
    function updateChartControls(view) {
        const controlsContainer = document.querySelector('.chart-controls');
        if (!controlsContainer) return;

        const controls = {
            overview: [
                { label: 'Revenue', chart: 'revenue' },
                { label: 'Profit', chart: 'profit' },
                { label: 'Cash Flow', chart: 'cashflow' }
            ],
            profitability: [
                { label: 'Margins', chart: 'margins' },
                { label: 'Revenue Mix', chart: 'revenue' },
                { label: 'Growth', chart: 'growth' }
            ],
            cashflow: [
                { label: 'Cash Flow', chart: 'flow' },
                { label: 'Balance', chart: 'balance' },
                { label: 'Runway', chart: 'runway' }
            ],
            efficiency: [
                { label: 'Ratios', chart: 'ratios' },
                { label: 'Turnover', chart: 'turnover' },
                { label: 'Working Capital', chart: 'working' }
            ]
        };

        controlsContainer.innerHTML = controls[view].map((ctrl, idx) =>
            `<button class="chart-btn ${idx === 0 ? 'active' : ''}" data-chart="${ctrl.chart}">${ctrl.label}</button>`
        ).join('');

        // Re-attach event listeners
        const newButtons = controlsContainer.querySelectorAll('.chart-btn');
        newButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                newButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const chartType = btn.getAttribute('data-chart');
                renderChart(chartType);
            });
        });
    }

    // Sidebar View Navigation
    const viewLinks = document.querySelectorAll('.sidebar a[data-view]');
    viewLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            viewLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            currentView = link.getAttribute('data-view');
            updateChartControls(currentView);

            // Render first chart of the new view
            const firstChart = Object.keys(viewData[currentView].charts)[0];
            renderChart(firstChart);

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Initialize with Overview -> Revenue chart
    updateChartControls('overview');
    renderChart('revenue');
}

// Action Buttons
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        showToast(`${action} - Coming soon!`);
    });
});

// Toast notifications
function showToast(message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}
