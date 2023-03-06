const { widget } = figma
const { Frame, AutoLayout, Input, SVG, Text, usePropertyMenu, useSyncedMap, useSyncedState, useEffect } = widget

function Widget() {

  const [title, setTitle] = useSyncedState("title", "")
  const entries = useSyncedMap("entries")

  const [counter, setCounter] = useSyncedState("counter", 0)

  useEffect(() => {
    console.log(entries.values())
  })

  usePropertyMenu([
    {
      itemType: 'action',
      tooltip: 'Add new task',
      propertyName: 'add',
    },
  ], ({propertyName, propertyValue}) => {
    if (propertyName === "add") {
      addEntry()
    }
  })

  const addEntry = () => {
    entries.set(String(counter), {
      id: String(counter),
      content: "",
      value: false
    })

    setCounter(counter + 1)
  }

  return <AutoLayout
    direction="vertical"
    padding={24}
    spacing={16}
    width={400}
    fill="#FFFFFF"
    cornerRadius={8}
    stroke="#CCCCCC"
    strokeWidth={1}
    horizontalAlignItems="center"
  >
    <Input
      width="fill-parent"
      onTextEditEnd={(event) => {
        setTitle(event.characters)
      }}
      value={title}
      fontSize={20}
      fontWeight={"bold"}
      placeholder="Add title..."
      hoverStyle={{
        fill: "#0000FF"
      }}
    />
    {entries.values().length !== 0 ?
      <AutoLayout
        direction="vertical"
        spacing={8}
        width="fill-parent"
      >
        {
          entries.values().map((entry) => {
            return <AutoLayout
                      direction="horizontal"
                      spacing={16}
                      width="fill-parent"
                      verticalAlignItems="center"
                      padding={{
                        vertical: 8
                      }}
                    >
                      <AutoLayout
                        width={20}
                        height={20}
                        stroke={entry.value ? "#777777" : "#000000"}
                        strokeWidth={2}
                        cornerRadius={2}
                        fill="#FFFFFF"
                        horizontalAlignItems={"center"}
                        verticalAlignItems={"center"}
                        hoverStyle={{
                          stroke: "#0000FF"
                        }}
                        onClick={() => {
                          entries.set(entry.id, {
                            ...entry,
                            value: !entry.value
                          })
                        }}
                      >
                        {entry.value ? <SVG
                          src={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.91429 14.3787L17.293 7L18.7072 8.41421L9.91429 17.2071L5.5 12.7928L6.91421 11.3786L9.91429 14.3787Z" fill="#777777"/>
                          </svg>`}
                        /> : <></>}
                      </AutoLayout>
                      <Input
                        width={"fill-parent"}
                        onTextEditEnd={(event) => {
                          entries.set(entry.id, {
                            ...entry,
                            content: event.characters
                          })
                        }}
                        value={entry.content}
                        placeholder="Add description..."
                        textDecoration={entry.value ? "strikethrough" : "none"}
                        fill={entry.value ? "#777777" : "#000000"}
                        hoverStyle={{
                          fill: "#0000FF"
                        }}
                      />
                      <AutoLayout
                        hoverStyle={{
                          fill: "#CBDAFF"
                        }}
                        cornerRadius={4}
                        onClick={() => {
                          entries.delete(entry.id)
                        }}
                      >
                        <SVG
                          src={`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5857 16L8.29285 22.2928L9.70706 23.7071L16 17.4142L22.2928 23.7071L23.7071 22.2928L17.4142 16L23.7071 9.70706L22.2928 8.29285L16 14.5857L9.70706 8.29285L8.29285 9.70706L14.5857 16Z" fill="black"/>
                          </svg>`}
                        />
                      </AutoLayout>
                    </AutoLayout>
          })
        }
      </AutoLayout> : <></>
    }
    {
      entries.values().length === 0 ?
      <AutoLayout
        stroke={"#000000"}
        strokeWidth={2}
        cornerRadius={8}
        padding={{
          vertical: 16,
          horizontal: 24
        }}
        hoverStyle={{
          stroke: "#0000FF"
        }}
        onClick={() => {
          addEntry()
        }}
      >
        <Text fontSize={16} >
          Add new task
        </Text>
      </AutoLayout> : <></>
    }
  </AutoLayout>
}

widget.register(Widget)
