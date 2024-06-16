import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHARTJS from '@salesforce/resourceUrl/ChartJs';

export default class AudienceGeography extends LightningElement {
    @track chart;

    renderedCallback() {
        if (this.chart) {
            return;
        }
        loadScript(this, CHARTJS)
            .then(() => {
                const ctx = this.template.querySelector('canvas').getContext('2d');
                this.chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['USA', 'Canada', 'Brazil', 'UK', 'Australia'],
                        datasets: [{
                            label: 'Number of Visitors',
                            data: [150, 120, 100, 90, 80],
                            backgroundColor: [
                                'rgba(82, 190, 128, 1)',
                                'rgba(22, 160, 133, 1)',
                                'rgba(39, 174, 96, 1)',
                                'rgba(88, 214, 141, 1)',
                                'rgba(23, 165, 137, 1)',
                            ],
                            borderColor: [
                                'rgba(82, 190, 128, 1)',
                                'rgba(22, 160, 133, 1)',
                                'rgba(39, 174, 96, 1)',
                                'rgba(88, 214, 141, 1)',
                                'rgba(23, 165, 137, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: '#ffffff'
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: '#ffffff'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
}
