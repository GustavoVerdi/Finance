<?php
// Configuração da conexão MySQLi
$servername = '127.0.0.1'; // Endereço do servidor MySQL
$username = 'root'; // Nome de usuário do MySQL
$password = '';   // Senha do MySQL (se aplicável)
$dbname = 'marcosbanco'; // Nome do banco de dados

// Cria uma nova instância de conexão MySQLi
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = md5($_POST['senha']); // Use md5 com cuidado, é uma hash fraca.
$endereco = $_POST['endereco'];
$bairro = $_POST['bairro'];
$cep = $_POST['cep'];

// Evite a injeção SQL usando instruções preparadas
$query_select = "SELECT email FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($query_select);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$row_count = $stmt->num_rows;
$stmt->close();

if ($email == "" || $email == null || $nome == "" || $nome == null) {
    echo "<script language='javascript' type='text/javascript'>
    alert('Os campos Nome e E-mail devem ser preenchidos');
    window.location.href='cadastro.html';</script>";
} else {
    if ($row_count > 0) {
        echo "<script language='javascript' type='text/javascript'>
        alert('Esse E-mail já existe');
        window.location.href='cadastro.html';</script>";
        die();
    } else {
        $query = "INSERT INTO usuarios (nome, email, senha, endereco, bairro, cep) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssssss", $nome, $email, $senha, $endereco, $bairro, $cep);
        
        if ($stmt->execute()) {
            echo "<script language='javascript' type='text/javascript'>
            alert('Usuário cadastrado com sucesso!');
            window.location.href='login.html'</script>";
        } else {
            echo "<script language='javascript' type='text/javascript'>
            alert('Não foi possível cadastrar esse usuário');
            window.location.href='cadastro.html'</script>";
        }
        $stmt->close();
    }
}

$conn->close();
?>
