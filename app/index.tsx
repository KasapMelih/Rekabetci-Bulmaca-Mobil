import { Link } from "expo-router";
import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function Index() {
  // Mock data for leaderboard
  const topPlayers = [
    { id: 1, name: "Melih", points: 2450 },
    { id: 2, name: "Mustafa", points: 2340 },
    { id: 3, name: "Zeynel", points: 2210 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="dark" />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-indigo-600 pt-12 pb-6 px-4 rounded-b-3xl shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-3xl font-bold text-white">BrainGames</Text>
              <Text className="text-white text-lg opacity-80">
                Challenge Your Mind
              </Text>
            </View>
            <TouchableOpacity className="bg-white/20 p-2 rounded-full">
              <Ionicons name="person" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* User Stats */}
          <View className="bg-white/10 rounded-xl p-4 flex-row justify-between">
            <View className="items-center">
              <Text className="text-white text-xs">Rank</Text>
              <Text className="text-white font-bold text-xl">#42</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xs">Points</Text>
              <Text className="text-white font-bold text-xl">1,250</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xs">Games</Text>
              <Text className="text-white font-bold text-xl">28</Text>
            </View>
          </View>
        </View>

        {/* Featured Games */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-slate-800 mb-4">
            Featured Games
          </Text>

          <View className="flex-row space-x-4 mb-8">
            {/* Sudoku */}
            <Link href="/sudoku" asChild>
              <TouchableOpacity className="bg-white rounded-xl shadow-md flex-1 overflow-hidden">
                <View className="h-32 bg-blue-500 items-center justify-center">
                  <MaterialCommunityIcons name="grid" size={48} color="white" />
                </View>
                <View className="p-3">
                  <Text className="font-bold text-slate-800">Sudoku</Text>
                  <Text className="text-xs text-slate-500">Logic puzzles</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* Minesweeper */}
            <Link href="/minesweeper" asChild>
              <TouchableOpacity className="bg-white rounded-xl shadow-md flex-1 overflow-hidden">
                <View className="h-32 bg-red-500 items-center justify-center">
                  <FontAwesome5 name="bomb" size={40} color="white" />
                </View>
                <View className="p-3">
                  <Text className="font-bold text-slate-800">Minesweeper</Text>
                  <Text className="text-xs text-slate-500">
                    Strategic sweeping
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Tic Tac Toe */}
          <Link href="/tictactoe" asChild>
            <TouchableOpacity className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <View className="h-40 bg-green-500 items-center justify-center">
                <MaterialCommunityIcons
                  name="close-box-outline"
                  size={60}
                  color="white"
                />
              </View>
              <View className="p-4">
                <Text className="font-bold text-slate-800 text-lg">
                  Tic Tac Toe
                </Text>
                <Text className="text-sm text-slate-500">
                  Challenge friends or AI
                </Text>
                <View className="flex-row items-center mt-2">
                  <View className="bg-green-100 px-2 py-1 rounded-full">
                    <Text className="text-xs text-green-700">Multiplayer</Text>
                  </View>
                  <Text className="text-xs text-slate-400 ml-2">
                    Coming soon!
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Daily Challenge */}
          <View className="bg-amber-500 rounded-xl p-4 mb-8 flex-row items-center">
            <View className="bg-white/20 p-3 rounded-full mr-4">
              <Ionicons name="trophy" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">
                Daily Challenge
              </Text>
              <Text className="text-white/80">
                Complete today's puzzle for 2x points!
              </Text>
            </View>
            <TouchableOpacity className="bg-white px-3 py-2 rounded-lg">
              <Text className="text-amber-600 font-bold">Play</Text>
            </TouchableOpacity>
          </View>

          {/* Leaderboard */}
          <View className="bg-white rounded-xl shadow-md p-4 mb-4">
            <Text className="text-lg font-bold text-slate-800 mb-3">
              Top Players
            </Text>

            {topPlayers.map((player, index) => (
              <View
                key={player.id}
                className="flex-row items-center py-2 border-b border-slate-100"
              >
                <Text className="font-bold text-lg text-slate-600 w-8">
                  {index + 1}
                </Text>
                <Text className="flex-1 text-slate-800">{player.name}</Text>
                <Text className="font-bold text-indigo-600">
                  {player.points} pts
                </Text>
              </View>
            ))}

            <TouchableOpacity className="mt-3 items-center">
              <Text className="text-indigo-600 font-medium">
                View Full Leaderboard
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row bg-white border-t border-slate-200 px-4 py-2">
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="home" size={24} color="#4f46e5" />
          <Text className="text-xs text-indigo-600 font-medium">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="trophy-outline" size={24} color="#64748b" />
          <Text className="text-xs text-slate-500">Compete</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="stats-chart-outline" size={24} color="#64748b" />
          <Text className="text-xs text-slate-500">Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="settings-outline" size={24} color="#64748b" />
          <Text className="text-xs text-slate-500">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
