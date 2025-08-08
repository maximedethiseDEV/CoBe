import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgClass} from '@angular/common';
import {LucideIconsList} from '@core/lists';

@Component({
  selector: 'app-file-uploader',
    imports: [
        LucideAngularModule,
        NgClass
    ],
  templateUrl: './file-uploader.component.html',
})
export class FileUploaderComponent {
    @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
    @Input() allowedTypes: string[] = ['application/pdf', 'image/png', 'image/jpeg'];
    @Output() fileSelected = new EventEmitter<File | null>();
    isDragging = false;
    selectedFile: File | null = null;
    public readonly iconsList: any = LucideIconsList;

    triggerFileInput() {
        this.fileInputRef.nativeElement.click();
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            this.setFile(null);
            return;
        }

        const file = input.files[0];
        if (!this.allowedTypes.includes(file.type)) {
            alert('Type de fichier non autorisé. Seuls PDF, PNG et JPEG sont acceptés.');
            input.value = '';
            this.setFile(null);
            return;
        }

        this.setFile(file);
    }

    removeFile() {
        this.setFile(null);
        if (this.fileInputRef.nativeElement) {
            this.fileInputRef.nativeElement.value = '';
        }
    }

    previewFile() {
        if (!this.selectedFile) return;
        const fileUrl = URL.createObjectURL(this.selectedFile);
        window.open(fileUrl, '_blank');
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.isDragging = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragging = false;

        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        if (!this.allowedTypes.includes(file.type)) {
            alert('Type non autorisé. Seuls PDF, PNG et JPEG sont acceptés.');
            return;
        }

        // Met à jour aussi l’input file
        const dt = new DataTransfer();
        dt.items.add(file);
        this.fileInputRef.nativeElement.files = dt.files;

        this.setFile(file);
    }

    private setFile(file: File | null) {
        this.selectedFile = file;
        this.fileSelected.emit(file);
    }
}
