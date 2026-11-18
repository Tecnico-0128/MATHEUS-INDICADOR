const funcionario = document.getElementById("funcionario")
const cpf = document.getElementById("cpf")
const nascimento = document.getElementById("nascimento")
const salario = document.getElementById("salario")
const funcao = document.getElementById("funcao")
const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []

const cpf_demitir = document.getElementById("cpf_demitir")

const cpf_salario = document.getElementById("cpf_salario")
const salario_novo = document.getElementById("salario_novo")

const cpf_listar = document.getElementById("cpf_listar")
const listar_funcionario = document.getElementById("listar_funcionario")


async function cadastro() {
    if (funcionario.value.trim() && cpf.value.trim() && nascimento.value.trim() && salario.value.trim() && funcao.value.trim()) {
        if (/^[A-Za-zÀ-ý\s]+$/.test(funcionario.value)) {
            if (/^\d{11}$/.test(cpf.value)) {
                if (/^\d+$/.test(salario.value)) {
                    if (salario.value <= 0) {
                        alert("O Salário deve ser maior que 0!")
                    } else {
                            let achou = false
                            for (let f of funcionarios) {
                                if (f.cpf == cpf.value)
                                    achou = true
                            }
                            if (!achou) {
                                const funcionarioo = {
                                    nome: funcionario.value,
                                    cpf: cpf.value,
                                    nascimento: nascimento.value,
                                    salario: salario.value,
                                    funcao: funcao.value,
                                    estadoAtual: "Ativo"
                                }
                                funcionarios.push(funcionarioo)
                                localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                                alert(funcionarioo.nome + " foi cadastrado(a)")
                                funcionario.value = ""
                                cpf.value = ""
                                nascimento.value = ""
                                salario.value = ""
                                funcao.value = ""
                            } else {
                                alert("Funcionário já está cadastrado, tente novamente!")
                            }
                    }
                } else {
                    alert("O Salário deve possuir somente números!")
                }
            } else {
                alert("O CPF deve possuir somente números e 11 digitos!!")
            }
        } else {
            alert("O Nome do funcioário deve possuir somente LETRAS!")
        }
    } else {
        alert("Todos os campos devem estar preenchidos!")
    }
}

function demitir() {
    let i = -1,
        achou = false
    if (cpf_demitir.value) {
            for (let buscar of funcionarios) {

                i++
                if (buscar.cpf == cpf_demitir.value) {
                    console.log("aqui foi em")
                    achou = true
                }

                if (achou) {
                    if (buscar.estadoAtual == "Demitido") {
                        alert("Não e possivel demitir um funcionário que já está demitido!")
                        return
                    }
                    // funcionarios.splice(i, 1)
                    funcionarios[i].estadoAtual = "Demitido"
                    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                    alert("O Funcionário foi demitido com sucesso!")
                    cpf_demitir.value = ""
                    return
                }
        }
    } else {
        alert("Todos os campos devem estar preenchidos!")
        return
    }
    alert("Funcionário não encontrado!")
}

function listar_funcionarios_ativos() {
    listar_funcionario.innerHTML = "FUNCIONÁRIOS ATIVOS:";
    for (let fun of funcionarios) {
        if (fun.estadoAtual == "Ativo") {
            listar_funcionario.innerHTML += `<p>Funcionário: ${fun.nome} |CPF: ${fun.cpf} |Data de Nascimento: ${fun.nascimento} |Salário: ${fun.salario} |Função: ${fun.funcao}</p>`;
        }
    }
}

function listar_funcionarios_demitidos() {
    listar_funcionario.innerHTML = "FUNCIONÁRIOS DEMITIDOS:";
    for (let fun of funcionarios) {
        if (fun.estadoAtual == "Demitido") {
            listar_funcionario.innerHTML += `<p>Funcionário: ${fun.nome} |CPF: ${fun.cpf} |Data de Nascimento: ${fun.nascimento} |Salário: ${fun.salario} |Função: ${fun.funcao}</p>`;
        }
    }
}
async function atu_salario() {
    let achou = false
    for (let buscar of funcionarios) {
        if (buscar.cpf == cpf_salario.value) {
            if (buscar.estadoAtual == "Demitido") {
                alert("Não e possivel atualizar o salário de um funcionário demitido!")
                return
            } else {
                if (Number(salario_novo.value) < Number(buscar.salario)) {
                    alert("O novo salário não pode ser menor do que o anterior!")
                    return
                } else {
                    if (salario_novo.value.trim().length > 0) {
                        buscar.salario = salario_novo.value
                    }
                    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                    alert("O salário do funcionário foi atualizado com sucesso!")
                    cpf_salario.value = ""
                    salario_novo.value = ""
                    achou = true
                    break
                }
            }
        }
    }
    if (!achou) {
        alert("O funcionário não foi encontrado!")
    }
}