import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { PageTitleComponent } from '@app/components/page-title.component';

import labdata from '../../lab.json';
import patientdata from '../../patientdata.json';

@Component({
    selector: 'app-lab-view',
    imports: [CommonModule, RouterLink, NgIcon, PageTitleComponent],
    templateUrl: './lab-view.html',
    styleUrl: './lab-view.scss',
})
export class LabView implements OnInit {
    lab: any = null;
    patient: any = null;
    resultEntries: { key: string; value: string; normalRange: string; status: string }[] = [];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const labId     = Number(this.route.snapshot.paramMap.get('labId'));
        const patientId = Number(this.route.snapshot.paramMap.get('id'));

        const allLabs: any[] = labdata as any[];
        this.lab = allLabs.find(l => l.labId === labId && l.patientId === patientId) ?? null;

        const allPatients: any[] = patientdata as any[];
        this.patient = allPatients.find(p => p.id === patientId) ?? null;

        if (this.lab?.results) {
            this.resultEntries = Object.entries(this.lab.results).map(([key, val]: [string, any]) => ({
                key:         this.formatKey(key),
                value:       val.value,
                normalRange: val.normalRange,
                status:      val.status,   // 'Normal' | 'High' | 'Low'
            }));
        }
    }

    /** Convert camelCase key → readable label */
    formatKey(key: string): string {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
    }

    /**
     * Returns a CSS class for the result value cell.
     * High → bold red  |  Low → bold blue  |  Normal → standard
     */
    getValueClass(status: string): string {
        switch (status?.toLowerCase()) {
            case 'high':    return 'val-high';
            case 'low':     return 'val-low';
            default:        return 'val-normal';
        }
    }
}
