import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {HabitWithUid, TimePeriod} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import {useUserContext} from '../utils/fn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface SelectHabitsModal {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHabits: React.Dispatch<React.SetStateAction<HabitWithUid[]>>;
}

export type HabitsCheckBox = HabitWithUid & {
  checked: boolean;
};

const SelectHabitsModal = ({
  isModalVisible,
  setModalVisible,
  setSelectedHabits,
}: SelectHabitsModal) => {
  const tailwind = useTailwind();
  const {habits} = useUserContext();
  const [habitsList, setHabitsList] = useState<HabitsCheckBox[]>([]);

  useEffect(() => {
    const newHabitsList: HabitsCheckBox[] = [];
    habits.forEach(habit => {
      if (habit.timePeriod !== TimePeriod.Month) {
        const index = habitsList.findIndex(e => e.uid === habit.uid);
        if (index > -1) {
          newHabitsList.push({...habit, checked: habitsList[index].checked});
        } else {
          newHabitsList.push({...habit, checked: false});
        }
      }
    });
    setHabitsList(newHabitsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habits]);

  useEffect(() => {
    const getCheckedFriends: HabitWithUid[] = habitsList
      .filter(habit => habit.checked)
      .map(({checked, ...properties}) => properties);
    setSelectedHabits(getCheckedFriends);
  }, [habitsList, setSelectedHabits]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        // useNativeDriver
        // hideModalContentWhileAnimating
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={tailwind('bg-white p-7')}>
          {habitsList.length > 0 ? (
            <>
              {habitsList.map(habit => {
                return (
                  <View
                    key={habit.uid}
                    style={tailwind('flex-row mb-3 items-center')}
                  >
                    <MaterialCommunityIcons
                      onPress={() => {
                        setHabitsList(prev => {
                          const newHabitsList = [...prev];
                          const index = newHabitsList.findIndex(
                            e => e.uid === habit.uid,
                          );
                          newHabitsList[index].checked =
                            !newHabitsList[index].checked;
                          return newHabitsList;
                        });
                      }}
                      name={
                        habit.checked
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      size={25}
                    />
                    <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
                      {habit.name}
                    </Text>
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
              {'You have no habits lol'}
            </Text>
          )}
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default SelectHabitsModal;
