import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function DropDown({ onSelectOption }: { onSelectOption: (value: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");

  const buttonRef = useRef<View>(null);
  const [top, setTop] = useState(0);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const onSelect = useCallback((item: { value: string, label: string }) => {
    setValue(item.value);
    setExpanded(false);
    onSelectOption(item.value); // Send selection to AWS
  }, [onSelectOption]);

  return (
    <View 
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;
        setTop(topOffset + heightOfComponent + (Platform.OS === 'android' ? -32 : 3));
      }}
    >
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8} 
            onPress={toggleExpanded}
        >
            <Text style={styles.text}>{value || "Select Option"}</Text>
            <AntDesign name={expanded ? "caretup" : "caretdown"} />
        </TouchableOpacity>
        {expanded ? (
          <Modal visible={expanded} transparent>
            <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
              <View style={styles.backdrop}>
                <View style={[styles.options, { top }]}>
                    <FlatList 
                        keyExtractor={(item) => item.value}
                        data={[
                            { value: '1', label: 'Option 1' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                            { value: '4', label: 'Option 4' },
                        ]} 
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                              activeOpacity={0.8} 
                              style={styles.optionItem}
                              onPress={() => onSelect(item)}
                            >
                              <Text>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    /> 
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        ) : null}
    </View> 
  );
}

const styles = StyleSheet.create({
    backdrop: {
      top:-100,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    optionItem: {
        height: 45,
        justifyContent: "center",
    },
    separator: {
        height: 10,
    },
    options: {
        position: "absolute",
        backgroundColor: 'white',
        width: "100%",
        padding: 10,
        borderRadius: 6,
        maxHeight: 250,
    },
    text: {
        fontSize: 15,
        opacity: 0.8,
    },
    button: {
      top: -115,
        height: 50,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 8,
    }
});


// import { 
//     View, 
//     Text, 
//     TouchableOpacity, 
//     StyleSheet, 
//     FlatList,
//     Modal,
//     TouchableWithoutFeedback,
//     Platform,
// } from 'react-native';
// import React, {useCallback, useRef, useState} from 'react';
// import {AntDesign} from '@expo/vector-icons'; 

// export default function DropDown() {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

//   const [value, setValue] = useState("");

//   const buttonRef = useRef<View>(null);

//   const [top, setTop] = useState(0);

//   const onSelect = useCallback((item: {value: string, label: string}) => {
//     //
//     setValue(item.value);
//     setExpanded(false);
//   },[])
//   return(
//     <View 
//       ref={buttonRef}
//       onLayout={(event) => {
//         const layout = event.nativeEvent.layout;
//         const topOffset = layout.y;
//         const heightOfComponent = layout.height;

//         const finalValue =
//           topOffset + heightOfComponent + (Platform.OS === 'android'?-32:3)

//         setTop(finalValue);
//       }}
//     >
//         <TouchableOpacity 
//             style={styles.button} 
//             activeOpacity={0.8} 
//             onPress={toggleExpanded}
//         >
//             <Text style={styles.text}>{value || "Select Option"}</Text>
//             <AntDesign name={expanded ? "caretup" : "caretdown"} />
//         </TouchableOpacity>
//         {expanded ? (
//           <Modal visible={expanded} transparent>
//             <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
//               <View style = {styles.backdrop}>
//                 <View 
//                   style={[
//                     styles.options, 
//                     {
//                       top
//                     }
//                   ]}
//                 >
//                     <FlatList 
//                         keyExtractor={(item) => item.value}
//                         data={[
//                             {value: 'Option 1', label: 'opt1'},
//                             {value:"Option 2", label: 'opt2'},
//                             {value: 'Option 3', label: 'opt3'},
//                             {value:"Option 4", label: 'op4'},
//                         ]} 
//                         renderItem={({item}) => (
//                             <TouchableOpacity 
//                               activeOpacity={0.8} 
//                               style={styles.optionItem}
//                               onPress={() => onSelect(item)}
//                             >
//                               <Text>{item.value}</Text>
//                             </TouchableOpacity>
//                         )}
//                         ItemSeparatorComponent={()=> (
//                           <View style={styles.separator}/>
//                         )}
//                     /> 
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </Modal>
//         ):null}
//     </View> 
//   );
// }


// const styles = StyleSheet.create({
//     backdrop: {
//       padding: 20,
//       justifyContent:"center",
//       alignItems: "center",
//       flex: 1,
//     },
//     optionItem: {
//         height: 45,
//         justifyContent: "center",
//     },
//     separator: {
//         height: 10,
//     },
//     options: {
//         position: "absolute",
//         // top: 53,
//         backgroundColor:'white',
//         width: "100%",
//         padding: 10,
//         borderRadius: 6,
//         maxHeight: 250,
//     },
//     text: {
//         fontSize: 15,
//         opacity: 0.8,
//     },
//     button: {
//         height: 50,
//         justifyContent: 'space-between',
//         backgroundColor: 'rgba(255, 255, 255, 0.75)',
//         flexDirection: 'row',
//         width: '100%',
//         alignItems: "center",
//         paddingHorizontal: 15,
//         borderRadius: 8,
//     }
// })