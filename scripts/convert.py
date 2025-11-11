import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
import os
from pathlib import Path
import json
from bs4 import BeautifulSoup
import sys

class HTMLToJSONConverter:
    def __init__(self, root):
        self.root = root
        self.root.title("HTML to JSON Converter")
        self.root.geometry("800x600")
        self.root.minsize(700, 500)
        
        # Устанавливаем иконку (если есть)
        try:
            self.root.iconbitmap("icon.ico")
        except:
            pass
        
        self.setup_ui()
        
    def setup_ui(self):
        # Основной фрейм
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Настройка grid
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(3, weight=1)
        
        # Заголовок
        title_label = ttk.Label(main_frame, text="HTML to JSON Converter", 
                               font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=3, pady=(0, 20))
        
        # Выбор папки с HTML
        ttk.Label(main_frame, text="Input Folder:").grid(row=1, column=0, sticky=tk.W, pady=5)
        
        self.input_folder_var = tk.StringVar()
        input_frame = ttk.Frame(main_frame)
        input_frame.grid(row=1, column=1, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        input_frame.columnconfigure(0, weight=1)
        
        self.input_entry = ttk.Entry(input_frame, textvariable=self.input_folder_var)
        self.input_entry.grid(row=0, column=0, sticky=(tk.W, tk.E), padx=(0, 5))
        
        self.input_button = ttk.Button(input_frame, text="Browse", command=self.browse_input_folder)
        self.input_button.grid(row=0, column=1)
        
        # Выбор папки для JSON
        ttk.Label(main_frame, text="Output Folder:").grid(row=2, column=0, sticky=tk.W, pady=5)
        
        self.output_folder_var = tk.StringVar()
        output_frame = ttk.Frame(main_frame)
        output_frame.grid(row=2, column=1, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        output_frame.columnconfigure(0, weight=1)
        
        self.output_entry = ttk.Entry(output_frame, textvariable=self.output_folder_var)
        self.output_entry.grid(row=0, column=0, sticky=(tk.W, tk.E), padx=(0, 5))
        
        self.output_button = ttk.Button(output_frame, text="Browse", command=self.browse_output_folder)
        self.output_button.grid(row=0, column=1)
        
        # Кнопки управления
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=3, column=0, columnspan=3, pady=10, sticky=tk.W)
        
        self.convert_button = ttk.Button(button_frame, text="Convert Folder", 
                                        command=self.convert_folder)
        self.convert_button.grid(row=0, column=0, padx=(0, 10))
        
        self.single_file_button = ttk.Button(button_frame, text="Convert Single File", 
                                           command=self.convert_single_file)
        self.single_file_button.grid(row=0, column=1, padx=(0, 10))
        
        self.clear_button = ttk.Button(button_frame, text="Clear Log", 
                                     command=self.clear_log)
        self.clear_button.grid(row=0, column=2)
        
        # Прогресс бар
        self.progress = ttk.Progressbar(main_frame, mode='indeterminate')
        self.progress.grid(row=4, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=5)
        
        # Лог
        ttk.Label(main_frame, text="Conversion Log:").grid(row=5, column=0, sticky=tk.W, pady=(10, 5))
        
        self.log_text = scrolledtext.ScrolledText(main_frame, height=15, width=80)
        self.log_text.grid(row=6, column=0, columnspan=3, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(0, 10))
        
        # Статус бар
        self.status_var = tk.StringVar(value="Ready")
        status_bar = ttk.Label(main_frame, textvariable=self.status_var, relief=tk.SUNKEN)
        status_bar.grid(row=7, column=0, columnspan=3, sticky=(tk.W, tk.E))
        
        # Заполняем значения по умолчанию
        self.input_folder_var.set(os.getcwd())
        self.output_folder_var.set(os.path.join(os.getcwd(), "converted_json"))
        
    def browse_input_folder(self):
        folder = filedialog.askdirectory(title="Select folder with HTML files")
        if folder:
            self.input_folder_var.set(folder)
            
    def browse_output_folder(self):
        folder = filedialog.askdirectory(title="Select folder for JSON files")
        if folder:
            self.output_folder_var.set(folder)
            
    def log(self, message):
        """Добавляет сообщение в лог"""
        self.log_text.insert(tk.END, message + "\n")
        self.log_text.see(tk.END)
        self.root.update_idletasks()
        
    def clear_log(self):
        """Очищает лог"""
        self.log_text.delete(1.0, tk.END)
        
    def update_status(self, message):
        """Обновляет статус бар"""
        self.status_var.set(message)
        self.root.update_idletasks()
        
    def html_table_to_json(self, html_string):
        """Конвертирует HTML таблицу в JSON формат"""
        soup = BeautifulSoup(html_string, 'html.parser')
        
        # Находим все строки таблицы
        rows = soup.find_all('tr')
        
        # Проверяем, есть ли ячейки с rowspan (вложенная структура)
        has_rowspan = any(cell.has_attr('rowspan') for row in rows for cell in row.find_all('td'))
        
        if has_rowspan:
            # Обрабатываем как вложенную структуру с секциями
            return self.process_nested_table(rows)
        else:
            # Обрабатываем как плоскую таблицу (key-value)
            return self.process_flat_table(rows)
    
    def process_flat_table(self, rows):
        """Обрабатывает плоскую таблицу без секций"""
        result = {}
        
        for row in rows:
            cells = row.find_all('td')
            if len(cells) >= 2:
                key = cells[0].get_text(strip=True)
                value = self.parse_value(cells[1].get_text(strip=True))
                result[key] = value
        
        return result
    
    def process_nested_table(self, rows):
        """Обрабатывает вложенную таблицу с секциями"""
        result = {}
        current_section = None
        section_data = {}
        
        for row in rows:
            cells = row.find_all('td')
            
            # Проверяем, есть ли ячейка с rowspan (начало новой секции)
            rowspan_cell = None
            for cell in cells:
                if cell.has_attr('rowspan'):
                    rowspan_cell = cell
                    break
            
            if rowspan_cell:
                # Если это новая секция, сохраняем предыдущую и начинаем новую
                if current_section and section_data:
                    result[current_section] = section_data.copy()
                
                current_section = rowspan_cell.get_text(strip=True)
                section_data = {}
                
                # Обрабатываем оставшиеся ячейки в строке
                remaining_cells = [cell for cell in cells if cell != rowspan_cell]
                if len(remaining_cells) >= 2:
                    key = remaining_cells[0].get_text(strip=True)
                    value = self.parse_value(remaining_cells[1].get_text(strip=True))
                    section_data[key] = value
            else:
                # Обычная строка с данными
                if len(cells) >= 2 and current_section:
                    key = cells[0].get_text(strip=True)
                    value = self.parse_value(cells[1].get_text(strip=True))
                    section_data[key] = value
        
        # Добавляем последнюю секцию
        if current_section and section_data:
            result[current_section] = section_data
        
        return result
    
    def parse_value(self, value_str):
        """Парсит строковые значения в соответствующие типы данных"""
        value_str = value_str.strip()
        
        # Обработка null значений
        if value_str.lower() in ['$null', 'null', '']:
            return None
        
        # Обработка булевых значений
        if value_str.lower() == 'true':
            return True
        if value_str.lower() == 'false':
            return False
        
        # Попытка преобразовать в число
        try:
            return int(value_str)
        except ValueError:
            try:
                return float(value_str)
            except ValueError:
                pass
        
        # Возвращаем строку, если не удалось преобразовать
        return value_str
    
    def convert_html_to_json(self, html_file_path=None, html_string=None):
        """Конвертирует HTML в JSON"""
        if html_file_path:
            with open(html_file_path, 'r', encoding='utf-8') as file:
                html_content = file.read()
        elif html_string:
            html_content = html_string
        else:
            raise ValueError("Need to specify either file path or HTML string")
        
        json_data = self.html_table_to_json(html_content)
        return json.dumps(json_data, indent=2, ensure_ascii=False)
    
    def convert_folder(self):
        """Конвертирует все HTML файлы в папке"""
        input_folder = self.input_folder_var.get()
        output_folder = self.output_folder_var.get()
        
        if not input_folder or not os.path.exists(input_folder):
            messagebox.showerror("Error", "Please select a valid input folder")
            return
            
        # Создаем выходную папку, если она не существует
        os.makedirs(output_folder, exist_ok=True)
        
        self.progress.start()
        self.convert_button.config(state='disabled')
        self.update_status("Converting...")
        
        try:
            input_path = Path(input_folder)
            html_files = list(input_path.glob("*.html"))
            
            if not html_files:
                messagebox.showwarning("Warning", "No HTML files found in the selected folder")
                return
            
            self.log(f"Found {len(html_files)} HTML files")
            self.log("Starting conversion...")
            
            success_count = 0
            error_count = 0
            
            for html_file in html_files:
                try:
                    self.log(f"Converting: {html_file.name}")
                    
                    # Конвертируем HTML в JSON
                    json_data = self.convert_html_to_json(html_file_path=html_file)
                    
                    # Создаем имя для JSON файла
                    json_filename = html_file.stem + ".json"
                    json_file_path = os.path.join(output_folder, json_filename)
                    
                    # Сохраняем JSON в файл
                    with open(json_file_path, 'w', encoding='utf-8') as json_file:
                        json_file.write(json_data)
                    
                    self.log(f"  ✓ Success: {json_filename}")
                    success_count += 1
                    
                except Exception as e:
                    self.log(f"  ✗ Error: {str(e)}")
                    error_count += 1
            
            # Создаем отчет
            report = {
                'input_folder': input_folder,
                'output_folder': output_folder,
                'total_files': len(html_files),
                'successful': success_count,
                'failed': error_count
            }
            
            report_file = os.path.join(output_folder, "conversion_report.json")
            with open(report_file, 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2, ensure_ascii=False)
            
            self.log(f"\nConversion completed!")
            self.log(f"Successful: {success_count}, Failed: {error_count}")
            self.log(f"Output folder: {output_folder}")
            self.log(f"Report saved to: {report_file}")
            
            messagebox.showinfo("Success", 
                               f"Conversion completed!\n"
                               f"Successful: {success_count}\n"
                               f"Failed: {error_count}\n"
                               f"Output: {output_folder}")
            
        except Exception as e:
            self.log(f"Fatal error: {str(e)}")
            messagebox.showerror("Error", f"Conversion failed: {str(e)}")
            
        finally:
            self.progress.stop()
            self.convert_button.config(state='normal')
            self.update_status("Ready")
    
    def convert_single_file(self):
        """Конвертирует одиночный HTML файл"""
        file_path = filedialog.askopenfilename(
            title="Select HTML file to convert",
            filetypes=[("HTML files", "*.html"), ("All files", "*.*")]
        )
        
        if not file_path:
            return
            
        output_folder = self.output_folder_var.get()
        os.makedirs(output_folder, exist_ok=True)
        
        try:
            self.log(f"Converting single file: {os.path.basename(file_path)}")
            
            # Конвертируем HTML в JSON
            json_data = self.convert_html_to_json(html_file_path=file_path)
            
            # Создаем имя для JSON файла
            json_filename = Path(file_path).stem + ".json"
            json_file_path = os.path.join(output_folder, json_filename)
            
            # Сохраняем JSON в файл
            with open(json_file_path, 'w', encoding='utf-8') as json_file:
                json_file.write(json_data)
            
            self.log(f"✓ Successfully converted to: {json_filename}")
            
            # Показываем превью JSON
            self.log("JSON preview (first 500 chars):")
            preview = json_data[:500] + ("..." if len(json_data) > 500 else "")
            self.log(preview)
            
            messagebox.showinfo("Success", f"File converted successfully!\nSaved to: {json_file_path}")
            
        except Exception as e:
            error_msg = f"Error converting file: {str(e)}"
            self.log(f"✗ {error_msg}")
            messagebox.showerror("Error", error_msg)

def main():
    # Проверяем наличие BeautifulSoup
    try:
        import bs4
    except ImportError:
        print("BeautifulSoup4 is required. Install it with: pip install beautifulsoup4")
        return
    
    # Создаем и запускаем GUI
    root = tk.Tk()
    app = HTMLToJSONConverter(root)
    root.mainloop()

if __name__ == "__main__":
    main()