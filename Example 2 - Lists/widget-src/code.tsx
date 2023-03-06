const { widget } = figma
const { Frame, useSyncedMap, useSyncedState, AutoLayout, Ellipse, usePropertyMenu, useEffect } = widget

function Widget() {
  const [counter, setCounter] = useSyncedState("counter", 0)
  const [color, setColor] = useSyncedState("color", "#e06666")
  const items = useSyncedMap("items")

  usePropertyMenu([
    {
      itemType: 'action',
      tooltip: 'Add new item',
      propertyName: 'action',
    },
    {
      itemType: 'color-selector',
      propertyName: 'colors',
      tooltip: 'Color selector',
      selectedOption: color,
      options: [{option: "#e06666", tooltip: "Red"}, {option: "#ffe599", tooltip: "Yellow"} ],
    },
  ], ({propertyName, propertyValue}) => {
    if (propertyName === "action") {
      addItem()
    }
    if (propertyName === "colors") {
      setColor(propertyValue as string)
    }
  })

  useEffect(() => {
    console.log(items.values())
  })

  const addItem = () => {
    const key = String(counter)

    items.set(
      key,
      {
        key,
        color: color
      }
    )

    setCounter(counter + 1)
  }

  const removeItem = (key: string) => {
    items.delete(key)
  }

  return <AutoLayout direction="vertical">
    {
      items.values().map((item) => {
        return <Ellipse fill={item.color} onClick={() => removeItem(item.key)}/>
      })
    }
  </AutoLayout>
}

widget.register(Widget)
