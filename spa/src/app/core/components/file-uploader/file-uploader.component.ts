import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, forwardRef} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgClass} from '@angular/common';
import {LucideIconsList} from '@core/lists';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-uploader',
    imports: [
        LucideAngularModule,
        NgClass
    ],
  templateUrl: './file-uploader.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ]
})
export class FileUploaderComponent implements ControlValueAccessor {
    @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
    @Input() allowedTypes: string[] = ['application/pdf', 'image/png', 'image/jpeg'];
    @Output() fileSelected = new EventEmitter<File | null>();
    isDragging = false;
    selectedFile: File | null = null;
    public readonly iconsList: any = LucideIconsList;

    // ControlValueAccessor hooks
    private onChange: (value: File | null) => void = () => {};
    private onTouched: () => void = () => {};
    private isDisabled = false;

    writeValue(value: File | null): void {
        this.selectedFile = value ?? null;
        // garder l'input file cohérent avec la valeur reçue
        if (this.fileInputRef?.nativeElement) {
            this.fileInputRef.nativeElement.value = '';
            if (value) {
                const dt = new DataTransfer();
                dt.items.add(value);
                this.fileInputRef.nativeElement.files = dt.files;
            }
        }
    }

    registerOnChange(fn: (value: File | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    triggerFileInput() {
        if (this.isDisabled) return;
        this.fileInputRef.nativeElement.click();
    }

    onFileSelected(event: Event) {
        if (this.isDisabled) return;
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            this.setFile(null);
            return;
        }

        const file = input.files[0];
        if (this.allowedTypes.length && !this.allowedTypes.includes(file.type)) {
            alert('Type de fichier non autorisé. Seuls PDF, PNG et JPEG sont acceptés.');
            input.value = '';
            this.setFile(null);
            return;
        }

        this.setFile(file);
    }

    removeFile() {
        if (this.isDisabled) return;
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
        if (this.isDisabled) return;
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        if (this.isDisabled) return;
        this.isDragging = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        if (this.isDisabled) return;
        this.isDragging = false;

        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        if (this.allowedTypes.length && !this.allowedTypes.includes(file.type)) {
            alert('Type non autorisé. Seuls PDF, PNG et JPEG sont acceptés.');
            return;
        }

        const dt = new DataTransfer();
        dt.items.add(file);
        this.fileInputRef.nativeElement.files = dt.files;

        this.setFile(file);
    }

    private setFile(file: File | null) {
        this.selectedFile = file;
        // notifier Angular forms + sortie event externe si quelqu'un la consomme
        this.onChange(file);
        this.onTouched();
        this.fileSelected.emit(file);
    }
}
