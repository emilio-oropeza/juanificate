QUnit.module('juanificate plugin');

QUnit.test('initializes with default options', function(assert) {
  var instance = $('#indepth_content').data('juanificate');
  assert.ok(instance, 'instance is stored in element data');
  assert.strictEqual(instance.genero, 'hombre', 'default genero');
  assert.strictEqual(instance.boca, 1, 'default boca');
  assert.strictEqual(instance.escenario, 1, 'default escenario');
  assert.strictEqual(instance.ojos, 1, 'default ojos');
  assert.strictEqual(instance.outfit, 1, 'default outfit');
  assert.strictEqual(instance.pantalones, 1, 'default pantalones');
  assert.strictEqual(instance.peinado, 1, 'default peinado');
  assert.strictEqual(instance.zapatos, 1, 'default zapatos');
});
