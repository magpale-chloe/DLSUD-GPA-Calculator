<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Page</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <header></header>

    <?php
        echo "Hello, World!";
    ?>
    
    <div class="top-controls">
    <div class="dropdown">
        <button id="semesterBtn" class="dropbtn">BSIT (Web Dev) ▾</button>
        <ul id="semesterMenu" class="dropdown-menu" hidden>
            <li data-value="webdev">BSIT (Web Dev)</li>
            <li data-value="networking">BSIT (Networking)</li>
        </ul>
    </div>
    <div id="gpa-display">GPA: <span id="gpa-value"></span></div>
    </div>

    
    
    <div class="glass">
        <table>
            <tr>
                <td>Course</td>
                <td>Title</td>
                <td>Units</td>
                <td style="text-align: center;">Midterm</td>
                <td style="text-align: center;">Final</td>
            </tr>
            <tr>
                <td>S-ITCS318LA</td>
                <td>INFORMATION ASSURANCE AND SECURITY 1 LAB</td>
                <td>1.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITCS318</td>
                <td>INFORMATION ASSURANCE AND SECURITY 1 LEC</td>
                <td>2.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITPC316LA</td>
                <td>INTEGRATIVE PROGRAMMING TECHNOLOGIES 1 LAB</td>
                <td>1.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITPC316</td>
                <td>INTEGRATIVE PROGRAMMING TECHNOLOGIES 1 LEC</td>
                <td>2.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITPE002</td>
                <td>IT PROFESSIONAL ELECTIVE LEC</td>
                <td>2.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITPE002LA</td>
                <td>IT PROFESSIONAL ELECTIVE LAB</td>
                <td>1.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITWB312LA</td>
                <td>MOBILE ENTERPRISE SYSTEMS LAB</td>
                <td>1.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITWB312</td>
                <td>MOBILE ENTERPRISE SYSTEMS LEC</td>
                <td>2.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITPC315LA</td>
                <td>NETWORKING 2 LAB</td>
                <td>1.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITPC315</td>
                <td>NETWORKING 2 LEC</td>
                <td>2.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>G-SOCS003</td>
                <td>THE CONTEMPORARY WORLD</td>
                <td>3.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITWB311LA</td>
                <td>WEB DEVELOPMENT LAB</td>
                <td>1.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
            <tr>
                <td>S-ITWB311</td>
                <td>WEB DEVELOPMENT LEC</td>
                <td>2.00</td>
                <td style="text-align: center;"><input class="textbox" type="number" name="midterm[]"></td>
                <td style="text-align: center;"><input class="textbox" type="number" name="final[]"></td>
            </tr>
        </table>
    </div>   

    <button class="gpa-btn">Calculate GPA</button>

    <footer></footer>
</body>
</html>
