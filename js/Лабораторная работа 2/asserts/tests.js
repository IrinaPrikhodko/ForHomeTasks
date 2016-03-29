describe("checkBracket", function() {
  it("Проверка для '()', '[]', '{}'", function() {
    assert.equal(checkBracket("()"), 0);
    assert.equal(checkBracket("[]"), 0);
    assert.equal(checkBracket("[]"), 0);
  });
  it("Проверка для '(]', '[)', '{{}'", function() {
    assert.equal(checkBracket("(]"), 1);
    assert.equal(checkBracket("[)"), 1);
    assert.equal(checkBracket("{])"), 1);
  });
  it("Проверка для '({)}', '[({)]}'", function() {
    assert.equal(checkBracket('({)}'), 2);
    assert.equal(checkBracket('[({)]}'), 3);
  });
  it("Проверка для '(', '{', '['", function() {
    assert.equal(checkBracket("("), -1);
    assert.equal(checkBracket("{"), -1);
    assert.equal(checkBracket("["), -1)
  });
  it("Проверка для 'test text () {} [] ([]) {[()]}'", function() {
    assert.equal(checkBracket("("), -1);
    assert.equal(checkBracket("{"), -1);
    assert.equal(checkBracket("["), -1)
  });

});
/*--------------------------------------------------------------------*/
describe("Валидация E-mail validateEmail", function() {
  it("Проверка для test@gmail.com, test@yandex.ru", function() {
    assert.isTrue(validateEmail("test@gmail.com"), true);
    assert.isTrue(validateEmail("test@yandex.ru"), true);
  });
  it("Проверка для test@gmail, test@yandex", function() {
    assert.isFalse(validateEmail("test@gmail"), false);
    assert.isFalse(validateEmail("test@yandex"), false);
  });  
  it("Проверка для test-gmail.com, test-yandex.ru", function() {
    assert.isFalse(validateEmail("test-gmail.com"), false);
    assert.isFalse(validateEmail("test-yandex.ru"), false);
  });  
  it("Проверка для @gmail.com, @yandex.ru", function() {
    assert.isFalse(validateEmail("@gmail.com"), false);
    assert.isFalse(validateEmail("@yandex.ru"), false);
  }); 
  it("Проверка для test@@@gmail.com, test@@@yandex.ru", function() {
    assert.isFalse(validateEmail("test@@@gmail.com"), false);
    assert.isFalse(validateEmail("test@@@yandex.ru"), false);
  });
  it("Проверка для gmail, yandex", function() {
    assert.isFalse(validateEmail("gmail"), false);
    assert.isFalse(validateEmail("yandex"), false);
  });
});
/*--------------------------------------------------------------------*/
describe("Валидация телефона validatePhone", function() {
  it("Проверка со скобками", function() {
    assert.equal(validatePhone("8(928)258-41-27"), true);
  }); 
  it("Проверка с пробелами", function() {
    assert.equal(validatePhone("+7 918 355 43 67"), true);
  });
  it("Проверка без +7 и 8", function() {
    assert.equal(validatePhone("918 507 67 56"), true);
  });
  it("Проверка сплошной номер", function() {
    assert.equal(validatePhone("+79801234345"), true);
  });
  it("Проверка некрасивого номера", function() {
    assert.equal(validatePhone("8(908 12345-90"), false);
  });
});
/*--------------------------------------------------------------------*/
describe("Валидация банковской карты validateBankCard", function() {
  it("Проверка для карты на 4", function() {
    assert.equal(validateBankCard("4123234345456123"), true);
  });
	it("Проверка для карты на 5", function() {
    assert.equal(validateBankCard("5412342345345645"), true);
  }); 
  it("Проверка для карты на 6", function() {
    assert.equal(validateBankCard("6011123234345456"), true);
  }); 
  it("Проверка неправильного номера", function() {
    assert.equal(validateBankCard("19573rgb"), false);
  }); 
  it("Проверка неправильного номера", function() {
    assert.equal(validateBankCard("13"), false);
  }); 
});
/*--------------------------------------------------------------------*/
describe("Замена слов из массива на *. replaceWords", function() {
  it("Проверка hello", function() {
    assert.equal(replaceWords("Hello, Hello, world!", ["Hello", "orl"]), "*****, *****, w***d!");
  }); 
  it("Проверка По", function() {
    assert.equal(replaceWords("Точка.Стоп.Подпись - Сноб", ["о", "С"]), "Т*чка.*т*п.П*дпись - *н*б");
  });
  it("Проверка цифры", function() {
    assert.equal(replaceWords("123423453456   8543269324 123354u14 v`2 123", ["123", "6", "54"]), "***42345345*   8**32*9324 ***3**u14 v`2 ***");
  });
  it("Проверка с ошибкой", function() {
    assert.notEqual(replaceWords("", ["Hello", "orl"]), "*****, *****, w***d!");
  });
  it("Проверка с ошибкой", function() {
    assert.notEqual(replaceWords("Hello, Hello, world!", ["Hello", "orl"]), "*****, w***d!");
  });
});
/*--------------------------------------------------------------------*/
describe("Найти все теги внутри элемента с заданным id и их количество countEachTagByParentId", function() {
  it("Проверка для контейнера с id = countTags1", function() {
    var tags = countEachTagByParentId("countTags1");
    assert.equal(tags["P"], 1);
    assert.equal(tags["STRONG"], 2);
    assert.equal(tags["SPAN"], 2);
    assert.equal(tags["BR"], 2);
  }); 
  it("Проверка для контейнера с id = countTags2", function() {
    var tags = countEachTagByParentId("countTags2");
    assert.equal(tags["P"], 3);
    assert.equal(tags["H1"], 1);
    assert.equal(tags["DIV"], 1);
    assert.equal(tags["BR"], 2);
  });
  it("Проверка для контейнера с id = countTags3", function() {
    var tags = countEachTagByParentId("countTags3");
    var isEmpty = function(obj) { for (var key in obj) {   return false;  } return true; };
    assert.isTrue(isEmpty(tags));
  });
});
/*--------------------------------------------------------------------*/
describe("Работа с событиями и DOM flex контейнера", function() {
  it("Проверка функции addToFlex", function() { 
	var flex_container = document.getElementsByClassName("flex-container")[0];  
	addToFlex("flex-container"); 
	var divelems = flex_container.getElementsByTagName('div'); 
	assert.equal(divelems[divelems.length-1].innerHTML, divelems.length); 
  }); 
  it("Проверка функции removeFromFlex", function() { 
	var flex_container = document.getElementsByClassName("flex-container")[0];  
	removeFromFlex("flex-container"); 
	var divelems = flex_container.getElementsByTagName('div'); 
	assert.equal(divelems[divelems.length-1].innerHTML, divelems.length); 
  });
  it("Проверка функции changeFlexDirection (row)", function() { 
    var flex_container = document.getElementsByClassName("flex-container")[0]; 
	changeFlexDirection("flex-container", "row");
	assert.equal(flex_container.style.flexDirection,"row"); 
  });
  it("Проверка функции changeFlexDirection (row-reverse)", function() { 
    var flex_container = document.getElementsByClassName("flex-container")[0]; 
	changeFlexDirection("flex-container", "row-reverse");
	assert.equal(flex_container.style.flexDirection,"row-reverse");
	
	changeFlexDirection("flex-container", "row");
  });
  it("Проверка функции changeFlexDirection (column)", function() { 
    var flex_container = document.getElementsByClassName("flex-container")[0]; 
	changeFlexDirection("flex-container", "column");
	assert.equal(flex_container.style.flexDirection,"column"); 
	
	changeFlexDirection("flex-container", "row");
  });
  it("Проверка функции changeFlexDirection (column-reverse)", function() { 
    var flex_container = document.getElementsByClassName("flex-container")[0]; 
	changeFlexDirection("flex-container", "column-reverse");
	assert.equal(flex_container.style.flexDirection,"column-reverse"); 
	
	changeFlexDirection("flex-container", "row");
  });
  it("Проверка функции changeFlexWrap (wrap)", function() { 
    var flex_container = document.getElementsByClassName("flex-container")[0]; 
	changeFlexWrap("flex-container", "wrap");
	assert.equal(flex_container.style.flexWrap,"wrap");
  });
  it("Проверка функции changeFlexWrap (nowrap)", function() { 
    var flex_container = document.getElementsByClassName("flex-container")[0]; 
	changeFlexWrap("flex-container", "nowrap");
	assert.equal(flex_container.style.flexWrap,"nowrap"); 
	
	changeFlexWrap("flex-container", "wrap");
  });
  it("Проверка функции changeFlexWrap (wrap-reverse)", function() { 
    var flex_container = document.getElementsByClassName("flex-container")[0]; 
	changeFlexWrap("flex-container", "wrap-reverse");
	assert.equal(flex_container.style.flexWrap,"wrap-reverse");  
	
	changeFlexWrap("flex-container", "wrap");
  });
});