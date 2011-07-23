AUI.add('aui-diagram-builder-base', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	isArrayList = function(val) {
		return (val instanceof A.ArrayList);
	},

	isNode = function(val) {
		return (val instanceof A.Node);
	},

	isAvailableField = function(val) {
		return (val instanceof A.AvailableField);
	},

	AArray = A.Array,

	ADD = 'add',
	ADD_NODE = 'addNode',
	AUTO = 'auto',
	AVAILABLE_FIELD = 'availableField',
	AVAILABLE_FIELDS = 'availableFields',
	AVAILABLE_FIELDS_DRAG_CONFIG = 'availableFieldsDragConfig',
	BASE = 'base',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
	CLEARFIX = 'clearfix',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	VIEWPORT = 'viewport',
	CONTENT_NODE = 'contentNode',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER_BASE = 'diagram-builder-base',
	DISK = 'disk',
	DRAGGABLE = 'draggable',
	DROP = 'drop',
	DROP_CONFIG = 'dropConfig',
	DROP_CONTAINER = 'dropContainer',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_CONTAINER = 'fieldsContainer',
	HEIGHT = 'height',
	HELPER = 'helper',
	ICON = 'icon',
	ICON_CLASS = 'iconClass',
	ID = 'id',
	LABEL = 'label',
	LIST = 'list',
	NODE = 'node',
	NODE_SETTINGS = 'nodeSettings',
	PROPERTY_LIST = 'propertyList',
	RENDERED = 'rendered',
	SAVE = 'save',
	SETTINGS = 'settings',
	TAB = 'tab',
	TABS = 'tabs',
	TABVIEW = 'tabview',
	TAB_VIEW = 'tabView',
	TOOLBAR = 'toolbar',
	TOOLBAR_CONTAINER = 'toolbarContainer',

	AgetClassName = A.getClassName,

	_SPACE = ' ',
	_DOT = '.',
	_DOLLAR = '$',
	_HASH = '#',

	CSS_DIAGRAM_BUILDER_BASE_DROP_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, DROP, CONTAINER),
	CSS_DIAGRAM_BUILDER_BASE_VIEWPORT = AgetClassName(DIAGRAM, BUILDER, BASE, VIEWPORT),
	CSS_DIAGRAM_BUILDER_BASE_FIELD = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD),
	CSS_DIAGRAM_BUILDER_BASE_FIELDS_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, FIELDS, CONTAINER),
	CSS_DIAGRAM_BUILDER_BASE_FIELD_DRAGGABLE = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD, DRAGGABLE),
	CSS_DIAGRAM_BUILDER_BASE_FIELD_ICON = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD, ICON),
	CSS_DIAGRAM_BUILDER_BASE_FIELD_LABEL = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD, LABEL),
	CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, TABS, CONTAINER),
	CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER_CONTENT = AgetClassName(DIAGRAM, BUILDER, BASE, TABS, CONTAINER, CONTENT),
	CSS_DIAGRAM_BUILDER_BASE_TAB_ADD = AgetClassName(DIAGRAM, BUILDER, BASE, TAB, ADD),
	CSS_DIAGRAM_BUILDER_BASE_TAB_SETTINGS = AgetClassName(DIAGRAM, BUILDER, BASE, TAB, SETTINGS),
	CSS_DIAGRAM_BUILDER_BASE_TOOLBAR_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, TOOLBAR, CONTAINER),
	CSS_HELPER_CLEARFIX = AgetClassName(HELPER, CLEARFIX),
	CSS_ICON = AgetClassName(ICON),
	CSS_TABVIEW_CONTENT = AgetClassName(TABVIEW, CONTENT),
	CSS_TABVIEW_LIST = AgetClassName(TABVIEW, LIST);

var AvailableField = A.Component.create({
	NAME: AVAILABLE_FIELD,

	ATTRS: {
		draggable: {
			value: true,
			validator: isBoolean
		},

		label: {
			validator: isString
		},

		iconClass: {
			validator: isString
		},

		id: {
			value: A.guid(),
			setter: '_setId',
			validator: isString
		},

		node: {
			valueFn: function(val) {
				var instance = this;

				if (!isNode(val)) {
					val = A.Node.create(
						A.Lang.sub(
							instance.FIELD_ITEM_TEMPLATE,
							{
								iconClass: instance.get(ICON_CLASS)
							}
						)
					);

					val.setData(AVAILABLE_FIELD, instance);
				}

				return val;
			},
			validator: isNode,
			writeOnce: true
		},

		type: {
			value: NODE,
			validator: isString
		}
	},

	EXTENDS: A.Base,

	buildNodeId: function(id) {
		return AVAILABLE_FIELDS + _DOLLAR + FIELD + _DOLLAR + id;
	},

	getAvailableFieldByNode: function(node) {
		return A.one(node).getData(AVAILABLE_FIELD);
	},

	getAvailableFieldById: function(id) {
		return A.AvailableField.getAvailableFieldByNode(_HASH+A.AvailableField.buildNodeId(id));
	},

	prototype: {
		FIELD_ITEM_TEMPLATE: '<li class="' + CSS_DIAGRAM_BUILDER_BASE_FIELD + '">' +
									'<span class="' + [ CSS_ICON, CSS_DIAGRAM_BUILDER_BASE_FIELD_ICON ].join(_SPACE) + ' {iconClass}"></span>' +
									'<span class="' + CSS_DIAGRAM_BUILDER_BASE_FIELD_LABEL + '"></span>' +
								'</li>',

		initializer: function() {
			var instance = this;
			var node = instance.get(NODE);

			instance.after({
				draggableChange: instance._afterDraggableChange,
				idChange: instance._afterIdChange,
				labelChange: instance._afterLabelChange
			});

			instance.labelNode = node.one(_DOT+CSS_DIAGRAM_BUILDER_BASE_FIELD_LABEL);

			instance._uiSetDraggable(
				instance.get(DRAGGABLE)
			);

			instance._uiSetId(
				instance.get(ID)
			);

			instance._uiSetLabel(
				instance.get(LABEL)
			);
		},

		_afterDraggableChange: function(event) {
			var instance = this;

			instance._uiSetDraggable(
				event.newVal
			);
		},

		_afterIdChange: function(event) {
			var instance = this;

			instance._uiSetId(
				event.newVal
			);
		},

		_afterLabelChange: function(event) {
			var instance = this;

			instance._uiSetLabel(
				event.newVal
			);
		},

		_setId: function(val) {
			return A.AvailableField.buildNodeId(val);
		},

		_uiSetDraggable: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_DIAGRAM_BUILDER_BASE_FIELD_DRAGGABLE, val);
		},

		_uiSetLabel: function(val) {
			var instance = this;

			instance.labelNode.setContent(val);
		},

		_uiSetId: function(val) {
			var instance = this;

			instance.get(NODE).set(ID, val);
		}
	}
});

A.AvailableField = AvailableField;

var FieldSupport = function() {
};

FieldSupport.ATTRS = {
	fields: {
		value: [],
		setter: '_setFields',
		validator: function(val) {
			return isArray(val) || isArrayList(val);
		}
	}
};

A.mix(FieldSupport.prototype, {
	createFields: function(val) {
		var instance = this;
		var fields = [];

		AArray.each(val, function(field) {
			fields.push(instance.createField(field));
		});

		return new A.ArrayList(fields);
	},

	addField: function(field) {
		var instance = this;
		var newField = instance.createField(field);

		instance._updateFields(
			instance.get(FIELDS).add(newField)
		);

		return newField;
	},

	removeField: function(field) {
		var instance = this;

		instance._updateFields(
			instance.get(FIELDS).remove(field)
		);
	},

	_updateFields: function(fields) {
		var instance = this;

		instance.set(FIELDS, fields);
	},

	_setFields: function(val) {
		var instance = this;

		if (isArrayList(val)) {
			return val;
		}
		else {
			return instance.createFields(val);
		}
	},

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Yoy *may* want to replace the methods from this section on your implementation.
	 */

	createField: function(val) {
		return val;
	}

	/*
	 * End of replaceable methods.
	 */
});

A.FieldSupport = FieldSupport;
// A.FieldSupport = A.Base.create('field-support', A.Base, [FieldSupport]);

var DiagramBuilderBase = A.Component.create(
	{
		NAME: DIAGRAM_BUILDER_BASE,

		ATTRS: {
			availableFields: {
				setter: '_setAvailableFields',
				validator: isArray
			},

			viewport: {
				valueFn: function() {
					return A.Node.create(this.VIEWPORT_TEMPLATE);
				}
			},

			dropContainer: {
				valueFn: function() {
					return A.Node.create(this.DROP_CONTAINER_TEMPLATE);
				}
			},

			dropConfig: {
				value: null,
				setter: '_setDropConfig',
				validator: isObject
			},

			availableFieldsDragConfig: {
				value: null,
				setter: '_setAvailableFieldsDragConfig',
				validator: isObject
			},

			fieldsContainer: {
				valueFn: function() {
					return A.Node.create(this.FIELDS_CONTAINER_TEMPLATE);
				}
			},

			propertyList: {
				setter: '_setPropertyList',
				validator: isObject,
				value: null
			},

			strings: {
				value: {
					addNode: 'Add node',
					cancel: 'Cancel',
					nodeSettings: 'Node settings',
					propertyName: 'Property Name',
					save: 'Save',
					value: 'Value'
				}
			},

			tabView: {
				setter: '_setTabView',
				validator: isObject,
				value: null,
				writeOnce: true
			},

			toolbar: {
				setter: '_setToolbar',
				validator: isObject,
				value: null
			},

			toolbarContainer: {
				valueFn: function() {
					return A.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);
				}
			}
		},

		HTML_PARSER: {
			dropContainer: _DOT+CSS_DIAGRAM_BUILDER_BASE_DROP_CONTAINER,
			fieldsContainer: _DOT+CSS_DIAGRAM_BUILDER_BASE_FIELDS_CONTAINER,
			toolbarContainer: _DOT+CSS_DIAGRAM_BUILDER_BASE_TOOLBAR_CONTAINER,
			viewport: _DOT+CSS_DIAGRAM_BUILDER_BASE_VIEWPORT
		},

		UI_ATTRS: [AVAILABLE_FIELDS, FIELDS],

		AUGMENTS: [A.FieldSupport],

		prototype: {
			DROP_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_BASE_DROP_CONTAINER + '"></div>',
			TOOLBAR_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_BASE_TOOLBAR_CONTAINER + '"></div>',
			FIELDS_CONTAINER_TEMPLATE: '<ul class="' + CSS_DIAGRAM_BUILDER_BASE_FIELDS_CONTAINER + '"></ul>',
			VIEWPORT_TEMPLATE: '<div tabindex="1" class="' + CSS_DIAGRAM_BUILDER_BASE_VIEWPORT + '"></div>',

			fieldsNode: null,
			propertyList: null,
			settingsNode: null,
			tabView: null,
			toolbar: null,

			initializer: function() {
				var instance = this;

				instance.publish({
					cancel: {
						defaultFn: instance._defCancelFn
					}
				});

				instance.after({
					render: instance._afterRender
				});

				instance.after(instance._afterUiSetHeight, instance, '_uiSetHeight');

				instance.viewport = instance.get(VIEWPORT);
				instance.dropContainer = instance.get(DROP_CONTAINER);
				instance.fieldsContainer = instance.get(FIELDS_CONTAINER);
				instance.toolbarContainer = instance.get(TOOLBAR_CONTAINER);
			},

			isAvailableFieldsDrag: function(drag) {
				var instance = this;
				var availableFieldsDrag = instance.availableFieldsDrag;

				return (drag === availableFieldsDrag.dd);
			},

			plotFields: function() {
				var instance = this;
				var fields = instance.get(FIELDS);

				fields.each(function(field) {
					instance.plotField(field);
				});
			},

			renderUI: function() {
				var instance = this;

				instance._renderTabs();
				instance._renderViewport();

				instance._uiSetAvailableFields(
					instance.get(AVAILABLE_FIELDS)
				);
			},

			syncUI: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);

				instance._setupDrop();
				instance._setupAvailableFieldsDrag();

				contentBox.addClass(CSS_HELPER_CLEARFIX);
			},

			_afterActiveTabChange: function(event) {
				var instance = this;
				var tabContentNode = event.newVal.get(CONTENT_NODE);

				if (instance.get(RENDERED) && (tabContentNode === instance.settingsNode)) {
					instance._renderSettings();
				}
			},

			_afterRender: function(event) {
				var instance = this;

				instance.plotFields();
			},

			_afterUiSetHeight: function(val) {
				var instance = this;

				instance.dropContainer.setStyle(HEIGHT, isNumber(val) ? val + instance.DEF_UNIT : val);
			},

			_defCancelFn: function(event) {
				var instance = this;

				instance.tabView.selectTab(0);
			},

			_handleCancelEvent: function() {
				var instance = this;

				instance.fire(CANCEL);
			},

			_handleSaveEvent: function() {
				var instance = this;

				instance.fire(SAVE);
			},

			_renderViewport: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);
				var viewport = instance.viewport;

				viewport.appendChild(instance.dropContainer);
				contentBox.appendChild(viewport);
			},

			_renderPropertyList: function() {
				var instance = this;

				if (!instance.propertyList) {
					instance.propertyList = new A.PropertyList(
						instance.get(PROPERTY_LIST)
					)
					.render(instance.settingsNode);

					instance.propertyList.get(BOUNDING_BOX).unselectable();
				}
			},

			_renderSettings: function() {
				var instance = this;

				instance._renderPropertyList();

				instance._renderToolbar();
			},

			_renderTabs: function() {
				var instance = this;

				if (!instance.tabView) {
					var tabView = new A.TabView(
						instance.get(TAB_VIEW)
					);

					instance.tabView = tabView;
					instance.fieldsNode = tabView.getTab(0).get(CONTENT_NODE);
					instance.settingsNode = tabView.getTab(1).get(CONTENT_NODE);
				}
			},

			_renderToolbar: function() {
				var instance = this;

				if (!instance.toolbar) {
					instance.toolbar = new A.Toolbar(
						instance.get(TOOLBAR)
					)
					.render(instance.settingsNode);
				}
			},

			_setupDrop: function() {
				var instance = this;

				instance.drop = new A.DD.Drop(
					instance.get(DROP_CONFIG)
				);
			},

			_setupAvailableFieldsDrag: function() {
				var instance = this;

				instance.availableFieldsDrag = new A.DD.Delegate(
					instance.get(AVAILABLE_FIELDS_DRAG_CONFIG)
				);
			},

			_setAvailableFields: function(val) {
				var instance = this;
				var fields = [];

				AArray.each(val, function(field, index) {
					fields.push(
						isAvailableField(field) ? field : new A.AvailableField(field)
					);
				});

				return fields;
			},

			_setDropConfig: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						groups: [AVAILABLE_FIELDS],
						node: instance.dropContainer
					},
					val || {}
				);
			},

			_setAvailableFieldsDragConfig: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						container: instance.get(BOUNDING_BOX),
						dragConfig: {
							groups: [AVAILABLE_FIELDS],
							plugins: [
								{
									cfg: {
										moveOnEnd: false
									},
									fn: A.Plugin.DDProxy
								}
							]
						},
						nodes: _DOT+CSS_DIAGRAM_BUILDER_BASE_FIELD_DRAGGABLE
					},
					val || {}
				);
			},

			_setPropertyList: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						width: 250,
						scroll: {
							height: 400,
							width: AUTO
						}
					},
					val
				);
			},

			_setTabView: function(val) {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);
				var tabListNode = boundingBox.one(_DOT+CSS_TABVIEW_LIST);

				var defaultValue = {
					after: {
						activeTabChange: A.bind(instance._afterActiveTabChange, instance)
					},
					boundingBox: boundingBox.one(_DOT+CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER),
					contentBox: boundingBox.one(_DOT+CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER_CONTENT),
					bubbleTargets: instance,
					contentNode: boundingBox.one(_DOT+CSS_TABVIEW_CONTENT),
					cssClass: CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER,
					listNode: tabListNode,
					render: instance.get(CONTENT_BOX)
				};

				if (!tabListNode) {
					var strings = instance.getStrings();

					defaultValue.items = [
						{ cssClass: CSS_DIAGRAM_BUILDER_BASE_TAB_ADD, label: strings[ADD_NODE] },
						{ cssClass: CSS_DIAGRAM_BUILDER_BASE_TAB_SETTINGS, label: strings[NODE_SETTINGS] }
					];
				}

				return A.merge(defaultValue, val);
			},

			_setToolbar: function(val) {
				var instance = this;
				var strings = instance.getStrings();

				return A.merge(
					{
						activeState: false,
						bubbleTargets: instance,
						children: [
							{
								handler: A.bind(instance._handleSaveEvent, instance),
								label: strings[SAVE],
								icon: DISK
							},
							{
								handler: A.bind(instance._handleCancelEvent, instance),
								label: strings[CANCEL]
							}
						]
					},
					val
				);
			},

			_uiSetAvailableFields: function(val) {
				var instance = this;
				var fieldsNode = instance.fieldsNode;

				if (fieldsNode) {
					var docFrag = A.getDoc().invoke(CREATE_DOCUMENT_FRAGMENT);

					AArray.each(val, function(field) {
						docFrag.appendChild(field.get(NODE));
					});

					fieldsNode.setContent(
						instance.fieldsContainer.setContent(docFrag)
					);
				}
			},

			_uiSetFields: function(event) {
				var instance = this;

				if (instance.get(RENDERED)) {
					instance.plotFields();
				}
			}
		}
	}
);

A.DiagramBuilderBase = DiagramBuilderBase;

}, '@VERSION@' ,{requires:['aui-tabs','aui-property-list','collection','dd'], skinnable:true});
AUI.add('aui-diagram-builder-impl', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	AArray = A.Array,

	isDiagramBuilder = function(val) {
		return (val instanceof A.DiagramBuilderBase);
	},

	isDiagramNode = function(val) {
		return (val instanceof A.DiagramNode);
	},

	isAnchor = function(val) {
		return (val instanceof A.Anchor);
	},

	getLeftTop = function(container, node) {
		var nodeXY = isArray(node) ? node : node.getXY();
		var containerXY = isArray(container) ? container : container.getXY();

		return AArray.map(containerXY, function(val, i) {
			return Math.max(0, val - nodeXY[i]);
		});
	},

	ANCHOR = 'anchor',
	ANCHORS = 'anchors',
	ANCHORS_DRAG_CONFIG = 'anchorsDragConfig',
	AVAILABLE_FIELD = 'availableField',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
	CLICK = 'click',
	CONTENT = 'content',
	CONTROLS = 'controls',
	CONTROLS_TOOLBAR = 'controlsToolbar',
	DATA = 'data',
	DBLCLICK = 'dblclick',
	DELETE = 'delete',
	DELETE_MESSAGE = 'deleteMessage',
	DESCRIPTION = 'description',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER_NAME = 'diagram-builder',
	DIAGRAM_NODE = 'diagramNode',
	DIAGRAM_NODE_NAME = 'diagram-node',
	DRAG_NODE = 'dragNode',
	EDITING = 'editing',
	ESC = 'esc',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_DRAG_CONFIG = 'fieldsDragConfig',
	HOVER = 'hover',
	KEYDOWN = 'keydown',
	LINK = 'link',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PARENT_NODE = 'parentNode',
	RECORDS = 'records',
	RECORDSET = 'recordset',
	REGION = 'region',
	RENDERED = 'rendered',
	SELECTED = 'selected',
	SHUFFLE = 'shuffle',
	TASK = 'task',
	TMP_CONNECTOR = 'tmpConnector',
	TYPE = 'type',
	VIEWPORT = 'viewport',
	WRAPPER = 'wrapper',
	XY = 'xy',

	_DOT = '.',
	_DOLLAR = '$',
	_EMPTY_STR = '',
	_DASH = '-',

	AgetClassName = A.getClassName,

	CSS_DB_ANCHOR_HOVER = AgetClassName(DIAGRAM, BUILDER, ANCHOR, HOVER),
	CSS_DB_ANCHOR_NODE = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE),
	CSS_DB_ANCHOR_NODE_WRAPPER = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, WRAPPER),
	CSS_DB_CONTROLS = AgetClassName(DIAGRAM, BUILDER, CONTROLS),
	CSS_DIAGRAM_NODE = AgetClassName(DIAGRAM, NODE),
	CSS_DIAGRAM_NODE_CONTENT = AgetClassName(DIAGRAM, NODE, CONTENT),
	CSS_DIAGRAM_NODE_EDITING = AgetClassName(DIAGRAM, NODE, EDITING),
	CSS_DIAGRAM_NODE_SELECTED = AgetClassName(DIAGRAM, NODE, SELECTED);

// REMOVE THIS!
var __dump = function() {
    var PAD = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', BR = '<br/>';

    A.all('.aui-diagram-node').each(function(n) {
        var b = _EMPTY_STR,
            dn = A.Widget.getByNode(n),
            dnName = dn.get('name'),
            dnBB = dn.get('boundingBox'),
            log = dnBB.one('.log') || A.Node.create('<div class=log />').appendTo(dnBB);

        b += dnName + BR;

        dn.get(FIELDS).each(function(a) {
            b += PAD + 'a: ' + a.get('id') + BR;

            a.get('targets').each(function(t) {
				var tdn = t.get(DIAGRAM_NODE);

				t.get('node').setContent(t.get('id'));

				b += PAD + PAD + 't: ' + tdn.get('name') + ' (s: ' + t.get('id') + ')' + BR;
            });

            a.get('sources').each(function(s) {
				var sdn = s.get(DIAGRAM_NODE);

				s.get('node').setContent(s.get('id'));

				b += PAD + PAD + 's: ' + sdn.get('name') + ' (t: ' + s.get('id') + ')' + BR;
            });
        });

        log.setContent(b);
    });
};
// END.

var DiagramBuilder = A.Component.create({
	NAME: DIAGRAM_BUILDER_NAME,

	ATTRS: {
		fieldsDragConfig: {
			value: null,
			setter: '_setFieldsDragConfig',
			validator: isObject
		},

		tmpConnector: {
			setter: '_setTmpConnector',
			value: {},
			validator: isObject
		}
	},

	EXTENDS: A.DiagramBuilderBase,

	FIELDS_TAB: 0,
	SETTINGS_TAB: 1,

	prototype: {
		editNode: null,

		initializer: function() {
			var instance = this;

			instance.on({
				cancel: instance._onCancel,
				'drag:drag': instance._onDrag,
				'drag:end': instance._onDragEnd,
				'drop:hit': instance._onDropHit,
				save: instance._onSave
			});

			instance.handlerKeyDown = A.getDoc().on(KEYDOWN, A.bind(instance._afterKeyEvent, instance));

			instance.dropContainer.delegate(CLICK, A.bind(instance._onNodeClick, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(DBLCLICK, A.bind(instance._onNodeEdit, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(MOUSEENTER, A.bind(instance._onMouseenterAnchors, instance), _DOT+CSS_DB_ANCHOR_NODE);
			instance.dropContainer.delegate(MOUSELEAVE, A.bind(instance._onMouseleaveAnchors, instance), _DOT+CSS_DB_ANCHOR_NODE);
		},

		syncUI: function() {
			var instance = this;

			A.DiagramBuilder.superclass.syncUI.apply(this, arguments);

			instance._setupFieldsDrag();

			instance.tmpConnector = new A.Connector(instance.get(TMP_CONNECTOR));
		},

		createField: function(val) {
			var instance = this;

			if (!isDiagramNode(val)) {
				// val.bubbleTargets = instance;
				val.builder = instance;
				val.viewport = instance.get(VIEWPORT);
				val = new (instance.getFieldClass(val.type || NODE))(val);
			}

			val.set(BUILDER, instance);

			return val;
		},

		getFieldClass: function(type) {
			var instance = this;
			var clazz = A.DiagramBuilder.types[type];

			if (clazz) {
				return clazz;
			}
			else {
				A.log('The field type: [' + type + '] couldn\'t be found.');

				return null;
			}
		},

		isFieldsDrag: function(drag) {
			var instance = this;
			var fieldsDrag = instance.fieldsDrag;

			return (drag === fieldsDrag.dd);
		},

		plotField: function(field) {
			var instance = this;

			if (!field.get(RENDERED)) {
				field.render(instance.dropContainer);
			}
		},

		unselectAll: function() {
			var instance = this;
			var selectedNode = instance.selectedNode;

			if (selectedNode) {
				selectedNode.set(SELECTED, false);
			}

			instance.selectedNode = null;
		},

		select: function(diagramNode) {
			var instance = this;

			instance.unselectAll();
			instance.stopEditingNode();
			instance.selectedNode = diagramNode.set(SELECTED, true).focus();
		},

		startEditingNode: function(diagramNode) {
			var instance = this;

			if (diagramNode) {
				instance.stopEditingNode();

				instance.tabView.selectTab(A.DiagramBuilder.SETTINGS_TAB);

				instance.propertyList.set(RECORDSET, diagramNode.getProperties());

				diagramNode.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE_EDITING);

				instance.editNode = diagramNode;
			}
		},

		stopEditingNode: function(diagramNode) {
			var instance = this;
			var editNode = diagramNode || instance.editNode;

			if (editNode) {
				instance.tabView.selectTab(A.DiagramBuilder.FIELDS_TAB);

				editNode.get(BOUNDING_BOX).removeClass(CSS_DIAGRAM_NODE_EDITING);

				instance.editNode = null;
			}
		},

		_afterKeyEvent: function(event) {
			var instance = this;

			if (!instance.selectedNode || event.hasModifier() || !event.isKeyInSet(ESC, DELETE)) {
				return;
			}

			if (event.isKey(ESC)) {
				instance._onEscKey(event);
			}
			else if (event.isKey(DELETE)) {
				instance._onDeleteKey(event);
			}

			event.halt();
		},

		_onCancel: function(event) {
			var instance = this;

			instance.stopEditingNode();
		},

		_onDrag: function(event) {
			var instance = this;
			var drag = event.target;

			if (instance.isFieldsDrag(drag)) {
				var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

				diagramNode.get(FIELDS).each(function(anchor) {
					anchor.alignConnectors();
				});
			}
		},

		_onDragEnd: function(event) {
			var instance = this;
			var drag = event.target;

			if (instance.isFieldsDrag(drag)) {
				var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

				diagramNode.set(XY, diagramNode.getLeftTop());
			}
		},

		_onDropHit: function(event) {
			var instance = this;
			var drag = event.drag;

			if (instance.isAvailableFieldsDrag(drag)) {
				var availableField = drag.get(NODE).getData(AVAILABLE_FIELD);

				var newField = instance.addField({
					xy: getLeftTop(drag.lastXY, instance.dropContainer),
					type: availableField.get(TYPE),
					fields: [{}]
				});

				instance.select(newField);
			}
		},

		_onDeleteKey: function(event) {
			var instance = this;

			instance.selectedNode.close();
		},

		_onEscKey: function(event) {
			var instance = this;

			instance.unselectAll();
			instance.stopEditingNode();
		},

		_onMouseenterAnchors: function(event) {
			var instance = this;

			event.currentTarget.addClass(CSS_DB_ANCHOR_HOVER);
		},

		_onMouseleaveAnchors: function(event) {
			var instance = this;

			event.currentTarget.removeClass(CSS_DB_ANCHOR_HOVER);
		},

		_onNodeClick: function(event) {
			var instance = this;
			var diagramNode = A.Widget.getByNode(event.currentTarget);

			instance.select(diagramNode);
		},

		_onNodeEdit: function(event) {
			var instance = this;

			// Only enable editing if the double clicked node is inside the node contentBox.
			if (!event.target.ancestor(_DOT+CSS_DIAGRAM_NODE_CONTENT, true)) {
				return;
			}

			var diagramNode = A.Widget.getByNode(event.currentTarget);

			if (diagramNode) {
				instance.startEditingNode(diagramNode);
			}
		},

		_onSave: function(event) {
			var instance = this;
			var editNode = instance.editNode;
			var recordset = instance.propertyList.get(RECORDSET);

			if (editNode) {
				AArray.each(recordset.get(RECORDS), function(record) {
					var data = record.get(DATA);

					editNode.set(data.attributeName, data.value);
				});

				instance.stopEditingNode(editNode);
			}
		},

		_setTmpConnector: function(val) {
			var instance = this;

			return A.merge(
				{
					lazyDraw: true,
					viewport: instance.viewport
				},
				val
			);
		},

		_setFieldsDragConfig: function(val) {
			var instance = this;
			var dropContainer = instance.dropContainer;

			return A.merge(
				{
					bubbleTargets: instance,
					container: dropContainer,
					dragConfig: {
						plugins: [
							{
								cfg: {
									constrain: dropContainer
								},
								fn: A.Plugin.DDConstrained
							},
							{
								cfg: {
									scrollDelay: 150
								},
								fn: A.Plugin.DDWinScroll
							}
						]
					},
					nodes: _DOT+CSS_DIAGRAM_NODE
				},
				val || {}
			);
		},

		_setupFieldsDrag: function() {
			var instance = this;

			instance.fieldsDrag = new A.DD.Delegate(
				instance.get(FIELDS_DRAG_CONFIG)
			);
		}
	}
});

A.DiagramBuilder = DiagramBuilder;

A.DiagramBuilder.types = {};

var DiagramNodeOverlay = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	EXTENDS: A.Overlay,

	// A.FieldSupport augment the class with "fields" attribute and util methods
	// such as: addField, removeField. Although the attribute is called "fields" due to
	// the augmentation, those fields are the anchors. TODO: Allow A.FieldSupport to
	// customize the name of the attribute and method sufixes.
	AUGMENTS: [A.FieldSupport]
});

var DiagramNode = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	UI_ATTRS: [FIELDS, NAME, SELECTED],

	ATTRS: {
		anchorsDragConfig: {
			value: null,
			setter: '_setAnchorsDragConfig',
			validator: isObject
		},

		builder: {
			setter: '_setBuilder',
			validator: isDiagramBuilder
		},

		description: {
			value: _EMPTY_STR,
			validator: isString
		},

		height: {
			value: 90
		},

		name: {
			valueFn: function() {
				var instance = this;

				return instance.get(TYPE) + (++A.Env._uidx);
			},
			validator: isString
		},

		selected: {
			value: false,
			validator: isBoolean
		},

		strings: {
			value: {
				deleteMessage: 'Are you sure you want to delete?',
				description: 'Description',
				name: 'Name',
				type: 'Type'
			}
		},

		type: {
			value: NODE,
			validator: isString
		},

		controlsToolbar: {
			setter: '_setControlsToolbar',
			validator: isObject,
			value: null
		},

		width: {
			value: 90
		},

		zIndex: {
			value: 100
		},

		tabIndex: {
			value: 1
		}
	},

	EXTENDS: DiagramNodeOverlay,

	buildNodeId: function(id) {
		return DIAGRAM_NODE_NAME + _DOLLAR + FIELD + _DOLLAR + id;
	},

	prototype: {
		ANCHOR_WRAPPER_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE_WRAPPER + '"></div>',
		CONTROLS_TEMPLATE: '<div class="' + CSS_DB_CONTROLS + '"></div>',

		initializer: function() {
			var instance = this;

			instance._renderNodes();
			instance._setupAnchorsDrag();

			instance.after({
				render: instance._afterRender
			});

			instance.on({
				'drag:drag': instance._onAnchorDrag,
				'drag:end': instance._onAnchorDragEnd,
				'drag:start': instance._onAnchorDragStart,
				'drop:hit': instance._onAnchorDropHit
			});

			instance.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE+_DASH+instance.get(TYPE));

			// REMOVE THIS!
			instance.set('bodyContent', instance.get(NAME));
		},

		alignAnchors: function() {
			var instance = this;
			var anchors = instance.get(FIELDS);

			var cRegion = instance.get(BOUNDING_BOX).get(REGION),
				dAngle = Math.floor(360/anchors.size()),
				a = cRegion.width/2,
				b = cRegion.height/2,
				centerX = cRegion.left + cRegion.width/2,
				centerY = cRegion.top + cRegion.height/2;

			anchors.each(function(anchor, index) {
				var anchorNode = anchor.get(NODE);
				var aRegion = anchorNode.get(REGION);
				var exy = instance._getEllipseXY(a, b, centerX, centerY, index*dAngle);

				anchorNode.setXY([ exy[0] - aRegion.width/2, exy[1] - aRegion.height/2 ]);

				anchor.alignConnectors();
			});

			return instance;
		},

		close: function() {
			var instance = this;
			var strings = instance.getStrings();

			if (confirm(strings[DELETE_MESSAGE])) {
				instance.get(FIELDS).each(function(anchor) {
					anchor.destroy();
				});

				instance.destroy();
			}

			__dump();

			return instance;
		},

		createField: function(val) {
			var instance = this;

			if (!isAnchor(val)) {
				var builder = instance.get(BUILDER);

				val.diagramNode = instance;
				val.viewport = (builder ? builder.get(VIEWPORT) : null);

				val = new A.Anchor(val);
			}

			return val;
		},

		getLeftTop: function() {
			var instance = this;

			return getLeftTop(instance.get(BOUNDING_BOX), instance._getContainer());
		},

		getProperties: function() {
			var instance = this;
			var propertyModel = instance.getPropertyModel();

			AArray.each(propertyModel, function(property) {
				property.value = instance.get(property.attributeName);
			});

			return propertyModel;
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			return [
				{
					attributeName: DESCRIPTION,
					editor: new A.TextAreaCellEditor(),
					name: strings[DESCRIPTION]
				},
				{
					attributeName: NAME,
					editor: new A.TextCellEditor({
						validator: {
							rules: {
								value: {
									required: true
								}
							}
						}
					}),
					name: strings[NAME]
				},
				{
					attributeName: TYPE,
					editor: false,
					name: strings[TYPE]
				}
			];
		},

		_afterRender: function(event) {
			var instance = this;

			instance.alignAnchors();

			instance._renderControls();
		},

		_getContainer: function() {
			var instance = this;

			return (instance.get(BUILDER).dropContainer || instance.get(BOUNDING_BOX).get(PARENT_NODE));
		},

		_getEllipseXY: function(a, b, centerX, centerY, angle) {
			var t = angle*Math.PI/180;

			return [ centerX + a*Math.cos(t), centerY - b*Math.sin(t) ];
		},

		_handleAddAnchorEvent: function(event) {
			var instance = this;

			instance.addField({});

			// event.halt();
		},

		_handleAddTaskEvent: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			var diagramNode = new A.DiagramNode({
				type: NODE,
				xy: [100, 100] // TODO - find best position?
			});

			builder.addField(diagramNode);

			var source = instance.addField({});
			var target = diagramNode.addField({});
			source.connect(target);
		},

		_handleCloseEvent: function(event) {
			var instance = this;

			instance.close();
		},

		_onAnchorDrag: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			builder.tmpConnector.set(P2, event.target.get(DRAG_NODE).getCenterXY());
		},

		_onAnchorDragEnd: function(event) {
			var instance = this;
			var shape = instance.get(BUILDER).tmpConnector.shape;

			shape.clear();
			shape.end();
		},

		_onAnchorDragStart: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			builder.tmpConnector.set(P1, event.target.get(NODE).getCenterXY());
		},

		_onAnchorDropHit: function(event) {
			var instance = this;
			var source = A.Anchor.getAnchorByNode(event.drag.get(NODE));
			var target = A.Anchor.getAnchorByNode(event.drop.get(NODE));

			source.connect(target);

			__dump();
		},

		_renderControls: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			instance.controlsNode = A.Node.create(instance.CONTROLS_TEMPLATE).appendTo(boundingBox);
		},

		_renderNodes: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			instance.anchorWrapper = A.Node.create(instance.ANCHOR_WRAPPER_TEMPLATE).appendTo(boundingBox);
		},

		_renderControlsToolbar: function(event) {
			var instance = this;

			instance.controlsToolbar = new A.Toolbar(
				instance.get(CONTROLS_TOOLBAR)
			)
			.render(instance.controlsNode);
		},

		_setBuilder: function(val) {
			var instance = this;

			instance.get(FIELDS).each(function(anchor) {
				anchor.set(VIEWPORT, val.get(VIEWPORT));
			});

			return val;
		},

		_setAnchorsDragConfig: function(val) {
			var instance = this;
			var builder = instance.get(BUILDER);

			return A.merge(
				{
					bubbleTargets: instance,
					container: instance.anchorWrapper,
					dragConfig: {
						groups: [ANCHORS],
						plugins: [
							{
								cfg: {
									constrain: (builder ? builder.get(VIEWPORT) : null)
								},
								fn: A.Plugin.DDConstrained
							},
							{
								cfg: {
									scrollDelay: 150
								},
								fn: A.Plugin.DDWinScroll
							},
							{
								cfg: {
									moveOnEnd: false
								},
								fn: A.Plugin.DDProxy
							}
						]
					},
					nodes: _DOT+CSS_DB_ANCHOR_NODE,
					target: true
				},
				val || {}
			);
		},

		_setupAnchorsDrag: function() {
			var instance = this;

			instance.anchorsDrag = new A.DD.Delegate(
				instance.get(ANCHORS_DRAG_CONFIG)
			);
		},

		_setControlsToolbar: function(val) {
			var instance = this;

			return A.merge(
				{
					activeState: false,
					children: [
						{
							handler: A.bind(instance._handleAddAnchorEvent, instance),
							icon: LINK
						},
						{
							handler: A.bind(instance._handleAddTaskEvent, instance),
							icon: SHUFFLE
						},
						{
							handler: A.bind(instance._handleCloseEvent, instance),
							icon: CANCEL
						}
					]
				},
				val
			);
		},

		_uiSetFields: function(val) {
			var instance = this;

			if (instance.get(RENDERED)) {
				instance.alignAnchors();

				setTimeout(function() {
					instance.anchorsDrag.syncTargets();
				}, 50);
			}
		},

		_uiSetName: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			boundingBox.setAttribute(NAME, A.DiagramNode.buildNodeId(val));
		},

		_uiSetSelected: function(val) {
			var instance = this;

			instance.get(BOUNDING_BOX).toggleClass(CSS_DIAGRAM_NODE_SELECTED, val);

			if (val && !instance.controlsToolbar) {
				instance._renderControlsToolbar();
			}

			// if (instance.get(RENDERED)) {
				// instance.alignAnchors();
			// }
		},

		_uiSetXY : function(val) {
			var instance = this;
			var containerXY = instance._getContainer().getXY();

            this._posNode.setXY([ val[0] + containerXY[0], val[1] + containerXY[1] ]);
        }
	}
});

A.DiagramNode = DiagramNode;

A.DiagramBuilder.types[NODE] = A.DiagramNode;

A.DiagramNodeTask = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		type: {
			value: TASK
		}
	},

	EXTENDS: A.DiagramNode
});

A.DiagramBuilder.types[TASK] = A.DiagramNodeTask;

// TODO deletar anchors OK
// TODO deletar connections (delete) OK
// TODO Adicionar overlay de controles OK
// TODO syncTargets dd delegate


// TODO gerar XML
// TODO reposicionar setas?
// TODO Adicionar groups/validation for connection

}, '@VERSION@' ,{requires:['aui-diagram-builder-base','overlay'], skinnable:true});
AUI.add('aui-diagram-builder-connector', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	YArray = A.Array,

	isAnchor = function(val) {
		return (val instanceof A.Anchor);
	},

	isArrayList = function(val) {
		return (val instanceof A.ArrayList);
	},

	ANCHOR = 'anchor',
	ARROW_POINTS = 'arrowPoints',
	BODY = 'body',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	COLOR = 'color',
	CONNECTOR = 'connector',
	DATA_ANCHOR = 'dataAnchor',
	DIAGRAM = 'diagram',
	DIAGRAM_NODE = 'diagramNode',
	HEIGHT = 'height',
	ID = 'id',
	LAZY_DRAW = 'lazyDraw',
	MAX_SOURCES = 'maxSources',
	MAX_TARGETS = 'maxTargets',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PATH = 'path',
	SHAPE = 'shape',
	SOURCES = 'sources',
	TARGETS = 'targets',
	VIEWPORT = 'viewport',
	WIDTH = 'width',
	WRAPPER = 'wrapper',

	_DOT = '.',

	AgetClassName = A.getClassName,

	CSS_DB_ANCHOR_NODE_WRAPPER = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, WRAPPER),
	CSS_DB_ANCHOR_NODE = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE);

A.PolygonUtil = {
	ARROW_POINTS: [
		[ -12, -6 ],
		[ -8, 0 ],
		[ -12, 6 ],
		[ 6, 0 ]
	],

	drawLineArrow: function(shape, x1, y1, x2, y2, arrowPoints) {
		var instance = this;

		shape.moveTo(x1, y1);
		shape.lineTo(x2, y2);

		var angle = Math.atan2(y2-y1, x2-x1), centerX = (x2+x1)/2, centerY = (y2+y1)/2;

		instance.drawPolygon(
			shape,
			instance.translatePoints(instance.rotatePoints(arrowPoints || instance.ARROW_POINTS, angle), centerX, centerY)
		);
	},

	drawPolygon: function(shape, points) {
		var instance = this;

		shape.moveTo(points[0][0], points[0][1]);

		YArray.each(points, function(p, i) {
			if (i > 0) {
				shape.lineTo(points[i][0], points[i][1]);
			}
		});

		shape.lineTo(points[0][0], points[0][1]);
		shape.end();
	},

	translatePoints: function(points, x, y) {
		var instance = this;
		var xy = [];

		YArray.each(points, function(p, i) {
			xy.push([ points[i][0] + x, points[i][1] + y ]);
		});

		return xy;
	},

	rotatePoints: function(points, angle) {
		var instance = this;
		var xy = [];

		YArray.each(points, function(p, i) {
			xy.push(instance.rotatePoint(angle, points[i][0], points[i][1]));
		});

		return xy;
	},

	rotatePoint: function(angle, x, y) {
		return [
			(x * Math.cos(angle)) - (y * Math.sin(angle)),
			(x * Math.sin(angle)) + (y * Math.cos(angle))
		];
	}
};

A.Connector = A.Base.create('line', A.Base, [], {
	graphics: null,
	shape: null,

	initializer: function(config) {
		var instance = this;

		instance.after({
			p1Change: instance.draw,
			p2Change: instance.draw
		});

		instance._initGraphics();
		instance._initShapes();

		if (!instance.get(LAZY_DRAW)) {
			instance.draw();
		}
	},

	destroy: function() {
		var instance = this;

		instance.graphics.destroy();
	},

	draw: function() {
		var instance = this;
		var shape = instance.shape;

		var c1 = instance.getCoordinate(instance.get(P1));
		var c2 = instance.getCoordinate(instance.get(P2));

		shape.clear();

		A.PolygonUtil.drawLineArrow(shape, c1[0], c1[1], c2[0], c2[1], instance.get(ARROW_POINTS));
	},

	getCoordinate: function(p) {
		var instance = this;
		var xy = instance.get(VIEWPORT).getXY();

		return [ p[0] - xy[0], p[1] - xy[1] ];
	},

	_initGraphics: function() {
		var instance = this;

		var graphics = new A.Graphic({
			width: instance.get(WIDTH),
			height: instance.get(HEIGHT),
			render: instance.get(VIEWPORT)
		});

		instance.graphics = graphics;
	},

	_initShapes: function() {
		var instance = this;

		instance.shape = instance.graphics.getShape(
			instance.get(SHAPE)
		);
	},

	_setShape: function(val) {
		var instance = this;

		return A.merge(
			{
				type: PATH,
				stroke: {
					color: instance.get(COLOR),
					weight: 2
				},
				fill: {
					color: instance.get(COLOR)
				}
			},
			val
		);
	}
},{
	ATTRS: {
		color: {
			value: '#666',
			validator: isString
		},

		lazyDraw: {
			value: false,
			validator: isBoolean
		},

		viewport: {
			setter: A.one,
			value: BODY
		},

		shape: {
			value: null,
			setter: '_setShape'
		},

		arrowPoints: {
			value: A.PolygonUtil.ARROW_POINTS
		},

		p1: {
			value: [0, 0],
			validator: isArray
		},

		p2: {
			value: [0, 0],
			validator: isArray
		}
	}
});

A.Anchor = A.Base.create('anchor', A.Base, [], {
	ANCHOR_WRAPPER_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE_WRAPPER + '"></div>',
	NODE_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE + '"></div>',

	connectors: null,

	initializer: function() {
		var instance = this;

		instance.connectors = {};

		instance._renderNode();

		instance.connectTargets();

		instance.after({
			targetsChange: instance._afterTargetsChange
		});
	},

	addSource: function(source) {
		var instance = this;

		return instance.updateSources(
			instance.get(SOURCES).remove(source).add(source)
		);
	},

	addTarget: function(target) {
		var instance = this;

		return instance.updateTargets(
			instance.get(TARGETS).remove(target).add(target)
		);
	},

	alignConnectors: function() {
		var instance = this;

		instance.get(TARGETS).each(function(target) {
			var tConnector = instance.getConnector(target);

			if (tConnector) {
				tConnector.set(P1, instance.getCenterXY());
				tConnector.set(P2, target.getCenterXY());
			}
		});

		instance.get(SOURCES).each(function(source) {
			var sConnector = source.getConnector(instance);

			if (sConnector) {
				sConnector.set(P1, source.getCenterXY());
				sConnector.set(P2, instance.getCenterXY());
			}
		});

		return instance;
	},

	destroy: function() {
		var instance = this;

		instance.disconnectTargets();
		instance.disconnectSources();

		instance.get(NODE).remove();
	},

	connect: function(target) {
		var instance = this;

		instance.addTarget(target);

		if (!instance.isConnected(target)) {
			var tConnector = target.get(CONNECTOR);

			tConnector.p1 = instance.getCenterXY();
			tConnector.p2 = target.getCenterXY();

			instance.connectors[target.get(ID)] = new A.Connector(tConnector);
		}

		return instance;
	},

	connectTargets: function() {
		var instance = this;

		instance.get(TARGETS).each(A.bind(instance.connect, instance));

		return instance;
	},

	disconnect: function(target) {
		var instance = this;

		instance.getConnector(target).destroy();

		instance.removeTarget(target);
		target.removeSource(instance);
	},

	disconnectTargets: function() {
		var instance = this;

		instance.get(TARGETS).each(function(target) {
			instance.disconnect(target);
		});

		return instance;
	},

	disconnectSources: function() {
		var instance = this;

		instance.get(SOURCES).each(function(source) {
			source.disconnect(instance);
		});

		return instance;
	},

	getCenterXY: function() {
		var instance = this;

		return instance.get(NODE).getCenterXY();
	},

	getConnector: function(target) {
		var instance = this;

		return instance.connectors[target.get(ID)];
	},

	isConnected: function(target) {
		var instance = this;

		return instance.connectors.hasOwnProperty(target.get(ID));
	},

	updateSources: function(sources) {
		var instance = this;

		instance.set(SOURCES, sources);

		return instance;
	},

	updateTargets: function(targets) {
		var instance = this;

		instance.set(TARGETS, targets);

		return instance;
	},

	removeSource: function(source) {
		var instance = this;

		return instance.updateSources(
			instance.get(SOURCES).remove(source)
		);
	},

	removeTarget: function(target) {
		var instance = this;

		return instance.updateTargets(
			instance.get(TARGETS).remove(target)
		);
	},

	_afterActiveChange: function(event) {
		var instance = this;

		instance._uiSetActive(event.newVal);
	},

	_afterTargetsChange: function(event) {
		var instance = this;

		// TODO - event.prevVal is always equal to event.newVal, review this
        // logic below, references between anchors needs to be cleaned up otherwise
        // will store the wrong relationship between nodes.

		event.prevVal.each(function(anchor) {
			anchor.removeSource(instance);
		});

		event.newVal.each(function(anchor) {
			anchor.addSource(instance);
		});
	},

	_renderNode: function() {
		var instance = this;
		var diagramNode = instance.get(DIAGRAM_NODE);
		var container = diagramNode.get(BOUNDING_BOX);

		instance.wrapper = container.one(_DOT+CSS_DB_ANCHOR_NODE_WRAPPER) ||
							A.Node.create(instance.ANCHOR_WRAPPER_TEMPLATE);

		instance.wrapper.appendTo(container).appendChild(instance.get(NODE));
	},

	_setConnector: function(val) {
		var instance = this;

		return A.merge(
			{
				viewport: instance.get(VIEWPORT)
			},
			val
		);
	},

	_setSources: function(val) {
		var instance = this;

		return instance._setAnchors(val);
	},

	_setTargets: function(val) {
		var instance = this;

		val = instance._setAnchors(val);

		val.each(function(anchor) {
			anchor.addSource(instance);
		});

		return val;
	},

	_setAnchors: function(val) {
		var instance = this;

		if (!isArrayList(val)) {
			var targets = [];

			A.Array.each(val, function(target) {
				if (isString(target)) {
					// TODO - need this?
					target = A.Anchor.getAnchorByNode(target);
				}

				targets.push( isAnchor(target) ? target : new A.Anchor(target) );
			});

			val = new A.ArrayList(targets);
		}

		return val;
	},

	_setNode: function(val) {
		var instance = this;
		var id = instance.get(ID);

		return A.one(val).set(ID, id).setData(DATA_ANCHOR, instance);
	}
},{
	ATTRS: {
		diagramNode: {
		},

		connector: {
			setter: '_setConnector',
			value: {},
			validator: isObject
		},

		id: {
			readOnly: true,
			valueFn: function() {
				return A.guid();
			}
		},

		maxSources: {
			value: Infinity,
			validator: isNumber
		},

		maxTargets: {
			value: Infinity,
			validator: isNumber
		},

		node: {
			setter: '_setNode',
			valueFn: function() {
				var instance = this;

				return A.Node.create(instance.NODE_TEMPLATE);
			}
		},

		sources: {
			value: [],
			setter: '_setSources',
			validator: function(val) {
				return isArray(val) || isArrayList(val);
			}
		},

		targets: {
			value: [],
			setter: '_setTargets',
			validator: function(val) {
				return isArray(val) || isArrayList(val);
			}
		},

		viewport: {
			setter: A.one,
			value: BODY
		}
	},

	getAnchorByNode: function(node) {
		return A.one(node).getData(DATA_ANCHOR);
	}
});

}, '@VERSION@' ,{requires:['aui-base','arraylist-add','arraylist-filter','json','graphics','dd'], skinnable:true});


AUI.add('aui-diagram-builder', function(A){}, '@VERSION@' ,{use:['aui-diagram-builder-base','aui-diagram-builder-impl','aui-diagram-builder-connector'], skinnable:true});

