from flask import Flask, render_template, request, redirect, url_for, send_file
from werkzeug.utils import secure_filename
from PyPDF2 import PdfWriter, PdfReader
from PyPDF2 import PdfMerger  # Update the import statement
import os
from pathlib import Path

app = Flask(__name__)

DOWNLOADS_FOLDER = str(Path.home() / "Downloads")
ALLOWED_EXTENSIONS = {'pdf'}

app.config['DOWNLOADS_FOLDER'] = DOWNLOADS_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def split_pages(pdf_file, start_page, end_page):
    pdf_reader = PdfReader(pdf_file)
    pdf_writer = PdfWriter()

    for page_num in range(start_page - 1, end_page):
        page = pdf_reader.pages[page_num]
        pdf_writer.add_page(page)

    output_filename = 'Split_completed_' + secure_filename(pdf_file.filename)
    output_path = os.path.join(app.config['DOWNLOADS_FOLDER'], output_filename)

    with open(output_path, 'wb') as output_file:
        pdf_writer.write(output_file)
    return output_path

def rotate_pages(pdf_file, page_numbers, degrees):
    pdf_reader = PdfReader(pdf_file)
    pdf_writer = PdfWriter()

    for i in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[i]
        if i + 1 in page_numbers:
            page.rotate(degrees[page_numbers.index(i + 1)])
        pdf_writer.add_page(page)

    output_filename = 'Rotate_completed_' + secure_filename(pdf_file.filename)
    output_path = os.path.join(app.config['DOWNLOADS_FOLDER'], output_filename)

    with open(output_path, 'wb') as fp:
        pdf_writer.write(fp)
    return output_path

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/split', methods=['POST'])
def split():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']
    if file.filename == '':
        return 'No selected file'

    if file and allowed_file(file.filename):
        start_page = int(request.form['start_page'])
        end_page = int(request.form['end_page'])
        output_filename = split_pages(file, start_page, end_page)
        return send_file(output_filename, as_attachment=True)
    else:
        return 'Invalid file format'

@app.route('/rotate', methods=['POST'])
def rotate():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']
    if file.filename == '':
        return 'No selected file'

    if file and allowed_file(file.filename):
        page_numbers = [int(num) for num in request.form.get('page_number').split(',')]
        degrees = [int(deg) for deg in request.form.get('degree').split(',')]
        output_filename = rotate_pages(file, page_numbers, degrees)
        return send_file(output_filename, as_attachment=True)
    else:
        return 'Invalid file format'

    
if __name__ == '__main__':
    app.run(debug=True)
